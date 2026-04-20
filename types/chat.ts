export type ChatRole = 'user' | 'assistant' | 'system'

export type ChatTextPart = {
  type: 'text'
  text: string
}

export type ChatFilePart = {
  type: 'file'
  mediaType: string
  url: string
  filename?: string
  attachmentId?: string
}

export type ChatPart = ChatTextPart | ChatFilePart

export type ChatUiMessage = {
  id: string
  role: ChatRole
  parts: ChatPart[]
}
