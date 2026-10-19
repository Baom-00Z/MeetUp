<script setup></script>

<template>
  <div v-if="value.socketId !== socket.id" class="chat-panel__users">
    <span class="chat-panel__name">{{
      users.find((v) => v.socketId === value.socketId).name
    }}</span>
    <span class="chat-panel__message">{{
      isTranslated ? value.translated : value.message
    }}</span>
  </div>
  <div v-else class="chat-panel__self">
    {{ value.message }}
  </div>
</template>
