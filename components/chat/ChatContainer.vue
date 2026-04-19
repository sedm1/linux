<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import ChatComposer from '~/components/chat/ChatComposer.vue'
import ChatMessages from '~/components/chat/ChatMessages.vue'
import ModelSelect from '~/components/chat/ModelSelect.vue'
import type { ChatMessage, LlmModel } from '~/types/chat'
import { useChatApi } from '~/composables/useChatApi'
import { useModelsApi } from '~/composables/useModelsApi'

const models = ref<LlmModel[]>([])
const selectedModel = ref('')
const messages = ref<ChatMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: 'Привет. Выбери модель и напиши сообщение.',
    createdAt: new Date().toISOString()
  }
])
const loadingModels = ref(false)
const sending = ref(false)
const error = ref('')

const { getModels } = useModelsApi()
const { sendChat } = useChatApi()

const hasModels = computed(() => models.value.length > 0)

const loadModels = async () => {
  loadingModels.value = true
  error.value = ''

  try {
    const result = await getModels()
    models.value = result

    if (!selectedModel.value && models.value.length > 0) {
      selectedModel.value = models.value[0].id
    }
  } catch (e: any) {
    error.value = e?.message || 'Не удалось загрузить модели'
  } finally {
    loadingModels.value = false
  }
}

const handleSend = async (text: string) => {
  if (!text.trim() || !selectedModel.value || sending.value) return

  error.value = ''
  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    content: text.trim(),
    createdAt: new Date().toISOString()
  }
  messages.value.push(userMessage)
  sending.value = true

  try {
    const answer = await sendChat({
      model: selectedModel.value,
      messages: messages.value
    })
    messages.value.push({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: answer,
      createdAt: new Date().toISOString()
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
    <template #header>
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <ModelSelect
          v-model="selectedModel"
          :models="models"
          :loading="loadingModels"
          :disabled="loadingModels || sending"
        />
        <UButton
          icon="i-lucide-refresh-cw"
          color="neutral"
          variant="soft"
          :loading="loadingModels"
          :disabled="sending"
          @click="loadModels"
        >
          Обновить модели
        </UButton>
      </div>
    </template>

    <div class="flex flex-col gap-4">
      <ChatMessages :items="messages" />

      <UAlert v-if="error" color="error" variant="soft" :title="error" />

      <ChatComposer
        :disabled="!hasModels || sending"
        :loading="sending"
        @submit="handleSend"
      />
    </div>
  </UCard>
</template>
