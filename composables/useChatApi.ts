import type { ChatUiMessage } from '~/types/chat'

type BackendMessage = {
  role: ChatUiMessage['role']
  content: string
}

type ChatPayload = {
  model: string
  messages: BackendMessage[]
}

type ChatResponse = {
  content?: string
  choices?: Array<{
    message?: {
      content?: string
    }
  }>
}

const toBackendMessage = (message: ChatUiMessage): BackendMessage => ({
  role: message.role,
  content: message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
})

export const useChatApi = () => {
  const config = useRuntimeConfig()

  const sendChat = async (messages: ChatUiMessage[]): Promise<string> => {
    const payload: ChatPayload = {
      model: config.public.gigachatModel,
      messages: messages.map(toBackendMessage)
    }

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
