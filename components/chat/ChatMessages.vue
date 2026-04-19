<script setup lang="ts">
import type { ChatMessage } from '~/types/chat'

defineProps<{
  items: ChatMessage[]
}>()
</script>

<template>
  <div class="h-[52vh] overflow-y-auto rounded-xl border border-white/10 bg-black/20 p-4">
    <div class="flex flex-col gap-3">
      <div
        v-for="message in items"
        :key="message.id"
        class="max-w-[92%] rounded-xl px-4 py-3 text-sm"
        :class="
          message.role === 'user'
            ? 'self-end bg-primary-500/20 text-primary-100'
            : 'self-start bg-neutral-800/80 text-neutral-100'
        "
      >
        <p class="whitespace-pre-wrap">{{ message.content }}</p>
      </div>
    </div>
  </div>
</template>
