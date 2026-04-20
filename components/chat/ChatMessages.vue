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
        class="flex"
        :class="message.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <UCard
          class="max-w-[92%]"
          :ui="{
            body: 'p-3 sm:p-4'
          }"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <UBadge
                :label="message.role === 'user' ? 'Вы' : 'GigaChat'"
                :color="message.role === 'user' ? 'primary' : 'neutral'"
                variant="soft"
              />
            </div>
          </template>

          <p class="whitespace-pre-wrap text-sm">{{ message.content }}</p>
        </UCard>
      </div>
    </div>
  </div>
</template>
