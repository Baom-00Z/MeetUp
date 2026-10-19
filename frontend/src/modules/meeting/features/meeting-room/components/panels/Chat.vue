<script setup>
import IconSend from "../icons/IconSend.vue";
import { formatMessageTime } from "@/utils/global.js";
import { useMeetingStore } from "@/stores/meeting/useMeetingStore";
import { useSocketStore } from "@/stores/meeting/useSocketStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const meetingStore = useMeetingStore();
const { messages, users } = storeToRefs(meetingStore);
const socketStore = useSocketStore();
const { socket } = storeToRefs(socketStore);

const message = ref("");

const shouldShowTime = (index) => {
  if (index === 0) return false;
  const curr = messages.value[index];
  const prev = messages.value[index - 1];
  return curr.time - prev.time >= 300000;
};

const sendMessage = () => {
  if (message.value.trim() === "") return;
  meetingStore.sendMessage(message.value.trim());
  message.value = "";
};
</script>

<template>
  <div class="chat-panel">
    <div class="chat-panel__messages">
      <template v-for="(value, index) in messages">
        <div v-if="value.socketId !== socket.id" class="chat-panel__users">
          <span class="chat-panel__name">{{
            users.find((v) => v.socketId === value.socketId).name
          }}</span>
          <span class="chat-panel__message">{{
            isTranslated ? value.translated : value.message
          }}</span>
        </div>
        <div v-if="value.socketId === socket.id" class="chat-panel__self">
          {{ value.message }}
        </div>
        <div v-if="shouldShowTime(index)" class="chat-panel__time">
          {{ formatMessageTime(value.time) }}
        </div>
      </template>
    </div>
    <div class="chat-panel__textbox">
      <input @keydown.enter="sendMessage" v-model="message" type="text" />
      <button @click="sendMessage">
        <IconSend></IconSend>
      </button>
    </div>
  </div>
</template>
