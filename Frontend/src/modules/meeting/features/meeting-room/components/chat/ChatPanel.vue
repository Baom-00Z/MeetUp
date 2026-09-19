<script setup>
import ChatComposer from "./ChatComposer.vue";
import ChatMessageList from "./ChatMessageList.vue";
</script>

<template>
  <div class="chat-panel">
    <ChatMessageList />
    <ChatComposer />
  </div>
</template>
