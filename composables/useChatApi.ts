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
  const config = useRuntimeConfig()

  const sendChat = async (payload: ChatPayload): Promise<string> => {
    const response = await $fetch<ChatResponse>(config.public.gigachatEndpoint, {
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
