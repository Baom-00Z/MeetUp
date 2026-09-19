<script setup>
import ChatMessage from "./ChatMessage.vue";
import ChatTime from "./ChatTime.vue";
</script>
<template>
  <div class="chat-panel__messages">
    <template v-for="(value, index) in messages">
      <ChatMessage :value="value" :index="index" />
      <ChatTime :value="value" :index="index" />
    </template>
  </div>
</template>
