<script setup lang="ts">
const props = defineProps<{
  disabled?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [value: string]
}>()

const message = ref('')

const send = () => {
  if (!message.value.trim()) return
  emit('submit', message.value)
  message.value = ''
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    send()
  }
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <UTextarea
      v-model="message"
      :disabled="props.disabled"
      :rows="4"
      autoresize
      placeholder="Напиши сообщение... Enter — отправить, Shift+Enter — новая строка"
      @keydown="onKeydown"
    />

    <div class="flex justify-end">
      <UButton
        icon="i-lucide-send"
        :loading="props.loading"
        :disabled="props.disabled || !message.trim()"
        @click="send"
      >
        Отправить
      </UButton>
    </div>
  </div>
</template>
