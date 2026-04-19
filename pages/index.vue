<script setup lang="ts">
import ChatContainer from '~/components/chat/ChatContainer.vue'
</script>

<template>
  <main class="mx-auto max-w-5xl p-4 md:p-8">
    <section class="mb-6 md:mb-8">
      <h1 class="mb-2 text-2xl font-semibold md:text-4xl">Nuxt 3 Chat UI</h1>
      <p class="max-w-3xl text-sm text-neutral-300 md:text-base">
        Легкий интерфейс чата на Nuxt UI v3. Модель выбирается из `/V1/models`, сообщения
        отправляются в `/api/chat` (через твой Nginx proxy).
      </p>
    </section>

    <ChatContainer />
  </main>
</template>
