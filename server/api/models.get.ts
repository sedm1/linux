import { getLmConfig } from '../utils/llm'

export default defineEventHandler(async (event) => {
  const { baseUrl, token, endpoint } = getLmConfig(event)

  return await $fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})
