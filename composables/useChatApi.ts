import type { ChatUiMessage } from '~/types/chat'

type BackendMessage = {
  role: ChatUiMessage['role']
  content: string
  attachments?: string[]
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

const toBackendMessage = (message: ChatUiMessage): BackendMessage => {
  const text = message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')
    .trim()

  const attachments = message.parts
    .filter((part) => part.type === 'file' && Boolean(part.attachmentId))
    .map((part) => part.attachmentId as string)

  return {
    role: message.role,
    content: text || '[Пользователь отправил изображение]',
    ...(attachments.length > 0 ? { attachments } : {})
  }
}

export const useChatApi = () => {
  const sendChat = async (model: string, messages: ChatUiMessage[]): Promise<string> => {
    const config = useRuntimeConfig()
    const payload: ChatPayload = {
      model,
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
