<script setup>
import { useMeetingStore } from "@/stores/meeting/useMeetingStore.js";
import IconCamera from "../icons/IconCamera.vue";
import IconCameraSlash from "../icons/IconCameraSlash.vue";
import IconMicro from "../icons/IconMicro.vue";
import IconMicroSlash from "../icons/IconMicroSlash.vue";
import { storeToRefs } from "pinia";

const meetingStore = useMeetingStore();
const { users } = storeToRefs(meetingStore);
</script>

<template>
  <div class="list-participants-panel">
    <div
      v-for="value in users"
      :key="value.socketId"
      class="list-participants-panel__user"
    >
      <div class="list-participants-panel__name">{{ value.name }}</div>
      <div class="list-participants-panel__status">
        <div class="list-participants-panel__mic">
          <IconMicro v-if="value.micro"></IconMicro>
          <IconMicroSlash v-else></IconMicroSlash>
        </div>
        <div class="list-participants-panel__cam">
          <IconCamera v-if="value.camera"></IconCamera>
          <IconCameraSlash v-else></IconCameraSlash>
        </div>
      </div>
    </div>
  </div>
</template>
