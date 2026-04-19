<script setup lang="ts">
import type { LlmModel } from '~/types/chat'

const modelValue = defineModel<string>({ required: true })

defineProps<{
  models: LlmModel[]
  loading?: boolean
  disabled?: boolean
}>()
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-2">
    <span class="text-xs uppercase tracking-wide text-neutral-400">Модель</span>
    <USelect
      v-model="modelValue"
      :items="models"
      value-key="id"
      label-key="name"
      :loading="loading"
      :disabled="disabled"
      placeholder="Выберите модель"
      class="w-full"
    />
  </div>
</template>
