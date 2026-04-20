<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ChatUiMessage } from '~/types/chat'
import { useChatApi } from '~/composables/useChatApi'

const prompt = ref('')
const messages = ref<ChatUiMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [{ type: 'text', text: 'Привет. Напиши сообщение, я отвечу через GigaChat.' }]
  }
])
const sending = ref(false)
const error = ref('')

const { sendChat } = useChatApi()

const chatStatus = computed(() => (sending.value ? 'submitted' : 'ready'))
const canSubmit = computed(() => prompt.value.trim().length > 0 && !sending.value)

const createTextMessage = (role: 'user' | 'assistant', text: string): ChatUiMessage => ({
  id: crypto.randomUUID(),
  role,
  parts: [{ type: 'text', text }]
})

const handleSubmit = async () => {
  const text = prompt.value.trim()
  if (!text || sending.value) return

  error.value = ''
  messages.value.push(createTextMessage('user', text))
  prompt.value = ''
  sending.value = true

  try {
    const answer = await sendChat(messages.value)
    messages.value.push(createTextMessage('assistant', answer))
  } catch (e: any) {
    error.value = e?.message || 'Ошибка при отправке сообщения'
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <UCard class="border-white/10 bg-black/35 backdrop-blur-sm">
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <span class="text-sm text-neutral-300">Провайдер: GigaChat</span>
        <UBadge color="primary" variant="soft" label="online" />
      </div>
    </template>

    <div class="space-y-4">
      <UChatMessages
        class="h-[52vh] overflow-y-auto pr-2"
        :messages="messages"
        :status="chatStatus"
        should-auto-scroll
        :assistant="{ avatar: { icon: 'i-lucide-bot' } }"
        :user="{ avatar: { icon: 'i-lucide-user' } }"
      />

      <UAlert v-if="error" color="error" variant="soft" :title="error" />

      <UChatPrompt
        v-model="prompt"
        :disabled="sending"
        placeholder="Напиши сообщение... Enter — отправить, Shift+Enter — новая строка"
        @submit.prevent="handleSubmit"
      >
        <template #footer>
          <div class="flex justify-end pt-2">
            <UChatPromptSubmit :status="chatStatus" :disabled="!canSubmit" />
          </div>
        </template>
      </UChatPrompt>
    </div>
  </UCard>
</template>
