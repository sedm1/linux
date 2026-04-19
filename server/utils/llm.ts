import type { H3Event } from 'h3'

export const getLlmConfig = (event: H3Event) => {
  const config = useRuntimeConfig(event)

  if (!config.llmBaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'LLM_BASE_URL is not configured'
    })
  }

  if (!config.llmToken) {
    throw createError({
      statusCode: 500,
      statusMessage: 'LLM_TOKEN is not configured'
    })
  }

  return {
    baseUrl: config.llmBaseUrl as string,
    token: config.llmToken as string,
    gigachatEndpoint: config.gigachatEndpoint as string,
    lmModelsEndpoint: config.lmModelsEndpoint as string
  }
}
