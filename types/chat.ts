export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatTextPart = {
  type: 'text'
  text: string
}

export type ChatUiMessage = {
  id: string
  role: ChatRole
  parts: ChatTextPart[]
}
