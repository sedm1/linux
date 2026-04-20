<script setup lang="ts">
import { ref } from 'vue'
import ChatComposer from '~/components/chat/ChatComposer.vue'
import ChatMessages from '~/components/chat/ChatMessages.vue'
import type { ChatMessage } from '~/types/chat'
import { useChatApi } from '~/composables/useChatApi'

const messages = ref<ChatMessage[]>([
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: 'Привет. Напиши сообщение, я отвечу через GigaChat.',
    createdAt: new Date().toISOString()
  }
])
const sending = ref(false)
const error = ref('')

const { sendChat } = useChatApi()

const handleSend = async (text: string) => {
  if (!text.trim() || sending.value) return

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
    const answer = await sendChat(messages.value)
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
</script>

<template>
  <UCard class="border-white/10 bg-black/35 backdrop-blur-sm">
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <span class="text-sm text-neutral-300">Провайдер: GigaChat</span>
        <UBadge color="primary" variant="soft" label="online" />
      </div>
    </template>

    <div class="flex flex-col gap-4">
      <ChatMessages :items="messages" />

      <UAlert v-if="error" color="error" variant="soft" :title="error" />

      <ChatComposer
        :disabled="sending"
        :loading="sending"
        @submit="handleSend"
      />
    </div>
  </UCard>
</template>
