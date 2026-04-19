import { getGigaChatConfig } from '../utils/llm'

type IncomingBody = {
  model: string
  messages: Array<{ role: string; content: string }>
}

export default defineEventHandler(async (event) => {
  const { baseUrl, token, endpoint } = getGigaChatConfig(event)
  const body = await readBody<IncomingBody>(event)

  if (!body?.model || !Array.isArray(body?.messages)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Body must contain model and messages'
    })
  }

  return await $fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: body.model,
      messages: body.messages
    }
  })
})
