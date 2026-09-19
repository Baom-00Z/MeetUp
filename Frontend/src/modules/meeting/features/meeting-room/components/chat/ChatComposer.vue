<script setup>
import { ref } from "vue";
import IconSend from "../icons/IconSend.vue";

const message = ref("");
const emit = defineEmits(["send-message"]);

const sendMessage = () => {
  if (message.value.trim()) {
    emit("send-message", message.value);
    message.value = "";
  }
};
</script>
<template>
  <div class="chat-panel__textbox">
    <input @keydown.enter="sendMessage" v-model="message" type="text" />
    <button @click="sendMessage">
      <IconSend></IconSend>
    </button>
  </div>
</template>
