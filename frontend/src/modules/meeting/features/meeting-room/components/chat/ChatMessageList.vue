<script setup>
import ChatMessage from "./ChatMessage.vue";
import ChatTime from "./ChatTime.vue";

const shouldShowTime = (index) => {
  if (index === 0) return false;
  const curr = messages.value[index];
  const prev = messages.value[index - 1];
  return curr.time - prev.time >= 300000;
};
</script>
<template>
  <div class="chat-panel__messages">
    <template v-for="(value, index) in messages">
      <ChatMessage :value="value" :index="index" />
      <ChatTime :value="value" :index="index" />
    </template>
  </div>
</template>
