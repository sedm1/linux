import type { H3Event } from 'h3'

export const getGigaChatConfig = (event: H3Event) => {
  const config = useRuntimeConfig(event)

  if (!config.gigaChatBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GIGACHAT_BASE_URL is not configured'
    })
  }

  if (!config.gigaChatToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GIGACHAT_TOKEN is not configured'
    })
  }

  return {
    baseUrl: config.gigaChatBaseUrl as string,
    token: config.gigaChatToken as string,
    endpoint: config.gigachatEndpoint as string
  }
}

export const getLmConfig = (event: H3Event) => {
  const config = useRuntimeConfig(event)

  if (!config.lmBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'LM_BASE_URL is not configured'
    })
  }

  if (!config.lmToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'LM_TOKEN is not configured'
    })
  }

  return {
    baseUrl: config.lmBaseUrl as string,
    token: config.lmToken as string,
    endpoint: config.lmModelsEndpoint as string
  }
}
