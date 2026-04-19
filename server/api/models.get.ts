import { getLlmConfig } from '../utils/llm'

export default defineEventHandler(async (event) => {
  const { baseUrl, token, lmModelsEndpoint } = getLlmConfig(event)

  return await $fetch(`${baseUrl}${lmModelsEndpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
