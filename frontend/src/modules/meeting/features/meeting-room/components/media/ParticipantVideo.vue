<script setup>
import IconMicro from "../icons/IconMicro.vue";
import IconMicroSlash from "../icons/IconMicroSlash.vue";
import IconRaiseHand from "../icons/IconRaiseHand.vue";

import { ref, watch, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useMeetingStore } from "@/stores/meeting/useMeetingStore.js";
import { capitalizeFirstLetter } from "@/utils/global.js";

const props = defineProps({
  user: Object,
});

const meetingStore = useMeetingStore();
const { dataShareScreen, emoji } = storeToRefs(meetingStore);

const videoRef = ref(null);

watch(
  () => props.user?.streams?.camera,
  async (stream) => {
    await nextTick();
    attachStream(videoRef, stream);
  },
);
</script>

<template>
  <div
    v-if="user.isLive"
    class="participant-video"
    :class="dataShareScreen.isSharingScreen ? 'present' : ''"
  >
    <div v-if="user?.camera" class="participant-video__video">
      <video ref="videoRef" autoplay playsinline></video>
    </div>

    <div v-else class="participant-video__avatar">
      <div
        class="participant-video__avatar-background"
        :style="{}"
      >
        <div class="participant-video__avatar-name">
          {{ capitalizeFirstLetter(user?.name) }}
        </div>
      </div>
    </div>

    <div class="participant-video__emoji">
      <span>{{ emoji.find((v) => v.id === user?.emoji)?.emoji }}</span>
    </div>

    <!-- <div class="participant-video__host"> (Host) {{ user.socketId === soc }}</div> -->

    <div class="participant-video__name">
      <IconRaiseHand v-if="user?.raiseHand"></IconRaiseHand>
      <span>{{ user?.name }}</span>
    </div>

    <div class="participant-video__icon">
      <IconMicro v-if="user?.micro"></IconMicro>
      <IconMicroSlash v-else></IconMicroSlash>
    </div>
  </div>
</template>
