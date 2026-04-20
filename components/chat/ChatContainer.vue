<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { ChatModel, ChatUiMessage } from '~/types/chat'
import { useChatApi } from '~/composables/useChatApi'
import { useModelsApi } from '~/composables/useModelsApi'

const config = useRuntimeConfig()
const prompt = ref('')
const selectedImage = ref<File | null>(null)
const models = ref<ChatModel[]>([])
const selectedModel = ref('')
const loadingModels = ref(false)
const messages = ref<ChatUiMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: 'Привет. Выбери модель, напиши сообщение или прикрепи фото.' }]
  }
])
const sending = ref(false)
const error = ref('')

const { sendChat } = useChatApi()
const { getModels } = useModelsApi()

const chatStatus = computed(() => (sending.value ? 'streaming' : 'ready'))
const canSubmit = computed(() =>
  !sending.value &&
  Boolean(selectedModel.value) &&
  (Boolean(prompt.value.trim()) || Boolean(selectedImage.value))
)

const loadModels = async () => {
  loadingModels.value = true
  error.value = ''

  try {
    const list = await getModels()
    models.value = list

    if (selectedModel.value && list.some((m) => m.id === selectedModel.value)) {
      return
    }

    selectedModel.value = list.find((m) => m.id === config.public.gigachatModel)?.id || list[0]?.id || ''
  } catch (e: any) {
    error.value = e?.message || 'Не удалось загрузить список моделей'
  } finally {
    loadingModels.value = false
  }
}

const readAsDataUrl = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Не удалось прочитать изображение'))
    reader.readAsDataURL(file)
  })

const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('purpose', 'general')

  const response = await $fetch<{ id?: string }>(config.public.gigachatFilesEndpoint, {
    method: 'POST',
    body: formData
  })

  if (!response?.id) {
    throw new Error('Не удалось загрузить фото в GigaChat')
  }

  return response.id
}

const handleSubmit = async () => {
  const text = prompt.value.trim()
  const image = selectedImage.value
  if ((!text && !image) || sending.value || !selectedModel.value) return

  error.value = ''
  sending.value = true

  try {
    const parts: ChatUiMessage['parts'] = []

    if (text) {
      parts.push({ type: 'text', text })
    }

    if (image) {
      const [previewUrl, attachmentId] = await Promise.all([
        readAsDataUrl(image),
        uploadImage(image)
      ])

      parts.push({
        type: 'file',
        mediaType: image.type || 'image/jpeg',
        filename: image.name,
        url: previewUrl,
        attachmentId
      })
    }

    messages.value.push({
      id: crypto.randomUUID(),
      role: 'user',
      parts
    })

    prompt.value = ''
    selectedImage.value = null

    const answer = await sendChat(selectedModel.value, messages.value)
    messages.value.push({
      id: crypto.randomUUID(),
      role: 'assistant',
      parts: [{ type: 'text', text: answer }]
    })
  } catch (e: any) {
    error.value = e?.message || 'Ошибка при отправке сообщения'
  } finally {
    sending.value = false
  }
}

onMounted(loadModels)
</script>

<template>
  <UCard class="border-white/10 bg-black/35 backdrop-blur-sm">
    <div class="space-y-4">
      <div class="flex flex-col gap-2 md:flex-row md:items-center">
        <USelect
          v-model="selectedModel"
          class="md:max-w-md"
          :items="models"
          value-key="id"
          label-key="name"
          :loading="loadingModels"
          :disabled="sending || loadingModels"
          placeholder="Выберите модель"
        />
        <UButton
          class="md:ml-auto"
          color="neutral"
          variant="soft"
          icon="i-lucide-refresh-cw"
          :loading="loadingModels"
          :disabled="sending"
          @click="loadModels"
        >
          Обновить модели
        </UButton>
      </div>

      <UChatMessages
        class="h-[52vh] overflow-y-auto pr-2"
        :messages="messages"
        :status="chatStatus"
        should-auto-scroll
        :assistant="{ avatar: { icon: 'i-lucide-bot' } }"
        :user="{ avatar: { icon: 'i-lucide-user' } }"
      >
        <template #files="{ parts }">
          <div class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
            <img
              v-for="(part, idx) in parts"
              :key="`${part.url}-${idx}`"
              :src="part.url"
              :alt="part.filename || 'image'"
              class="h-24 w-full rounded-md object-cover"
            >
          </div>
        </template>
      </UChatMessages>

      <UChatReasoning
        v-if="sending"
        text="Модель анализирует запрос..."
        streaming
      />

      <UAlert v-if="error" color="error" variant="soft" :title="error" />

      <UChatPrompt
        v-model="prompt"
        :disabled="sending || !selectedModel"
        placeholder="Напиши сообщение... Enter — отправить, Shift+Enter — новая строка"
        @submit.prevent="handleSubmit"
      >
        <template #header>
          <div class="flex items-center gap-2 px-2 pt-2">
            <UFileUpload
              v-model="selectedImage"
              variant="button"
              color="neutral"
              size="sm"
              accept="image/*"
              :preview="false"
              icon="i-lucide-image-plus"
              label="Фото"
              :disabled="sending || !selectedModel"
            />
            <UBadge
              v-if="selectedImage"
              color="neutral"
              variant="soft"
              :label="selectedImage.name"
            />
          </div>
        </template>

        <template #footer>
          <div class="flex w-full justify-end pt-2">
            <UChatPromptSubmit :status="chatStatus" :disabled="!canSubmit" />
          </div>
        </template>
      </UChatPrompt>
    </div>
  </UCard>
</template>
