<script setup>
import { formatMessageTime } from "@/utils/global.js";
</script>
<template>
  <div class="chat-panel__time">
    {{ formatMessageTime(value.time) }}
  </div>
</template>
