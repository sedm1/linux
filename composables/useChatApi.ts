import type { ChatMessage } from '~/types/chat'

type ChatPayload = {
  model: string
  messages: ChatMessage[]
}

type ChatResponse = {
  content?: string
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

export const useChatApi = () => {
  const sendChat = async (payload: ChatPayload): Promise<string> => {
    const response = await $fetch<ChatResponse>('/api/chat', {
      method: 'POST',
      body: payload
    })

    return (
      response.content ||
      response.choices?.[0]?.message?.content ||
      'Пустой ответ от модели'
    )
  }

  return { sendChat }
}
