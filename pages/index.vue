<script setup lang="ts">
import ChatContainer from '~/components/chat/ChatContainer.vue'
</script>

<template>
  <main class="mx-auto max-w-5xl p-4 md:p-8">
    <section class="mb-6 md:mb-8">
      <h1 class="mb-2 text-2xl font-semibold md:text-4xl">Чат на nuxt + nuxt ui</h1>
      <p class="max-w-3xl text-sm text-neutral-300 md:text-base">
        работу выполнил Новиков Николай Викторович 409250
      </p>
    </section>

    <ChatContainer />
  </main>
</template>
