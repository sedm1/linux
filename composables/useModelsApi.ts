import type { ChatModel } from '~/types/chat'

type RawModel = {
  id?: string
  name?: string
  description?: string
}

type ModelsResponse =
  | {
      data?: RawModel[]
      models?: RawModel[]
      items?: RawModel[]
    }
  | RawModel[]

const toModel = (item: RawModel): ChatModel => ({
  id: item.id || '',
  name: item.name || item.id || 'unknown-model'
})

export const useModelsApi = () => {
  const config = useRuntimeConfig()

  const getModels = async (): Promise<ChatModel[]> => {
    const response = await $fetch<ModelsResponse>(config.public.gigachatModelsEndpoint)
    const raw = Array.isArray(response)
      ? response
      : response.data || response.models || response.items || []

    return raw
      .filter((item) => Boolean(item?.id))
      .map(toModel)
  }

  return { getModels }
}
