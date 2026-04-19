import type { LlmModel } from '~/types/chat'

type ModelsResponse =
  | {
      data?: Array<{ id?: string; name?: string }>
      models?: Array<{ id?: string; name?: string }>
    }
  | Array<{ id?: string; name?: string }>

const mapModel = (item: { id?: string; name?: string }): LlmModel => ({
  id: item.id || '',
  name: item.name || item.id || 'unknown-model'
})

export const useModelsApi = () => {
  const getModels = async (): Promise<LlmModel[]> => {
    const response = await $fetch<ModelsResponse>('/api/models')
    const raw = Array.isArray(response)
      ? response
      : response.data || response.models || []

    return raw.filter((x) => Boolean(x?.id)).map(mapModel)
  }

  return { getModels }
}
