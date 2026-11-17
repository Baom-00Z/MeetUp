<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import MeetingSidebar from "../components/room/MeetingSidebar.vue";
import MeetingStage from "../components/room/MeetingStage.vue";
import CaptionPanel from "../components/captions/CaptionPanel.vue";
import Emoji from "../components/emojis/Emoji.vue";
import MeetingControl from "../components/room/MeetingControl.vue";

const VideoContainer = ref(null);

onMounted(async () => {
  initEvents();
  await socketStore.connectSocket();
  await meetingStore.joinMeeting();
});

watch(
  () => renderVideo.value.length,
  async (length) => {
    await nextTick();
    let row = 0;
    let col = 0;

    const videoSqrt = Math.sqrt(length);
    row = Math.floor(videoSqrt);

    col = Math.ceil(length / row);

    VideoContainer.value.style.gridTemplateColumns = `repeat(${col}, 1fr)`;
    VideoContainer.value.style.gridTemplateRows = `repeat(${row}, 1fr)`;
  },
);

const infoPanel = ref(false);
const isChat = ref(false);
const isUser = ref(false);

function handleUserClick() {
  if (isChat.value) {
    infoPanel.value = true;
    isUser.value = true;
    isChat.value = false;
  } else {
    infoPanel.value = !infoPanel.value;
    isUser.value = infoPanel.value;
  }
}

function handleChatClick() {
  if (isUser.value) {
    infoPanel.value = true;
    isChat.value = true;
    isUser.value = false;
  } else {
    infoPanel.value = !infoPanel.value;
    isChat.value = infoPanel.value;
  }
}

function closePanel() {
  infoPanel.value = false;
  isUser.value = false;
  isChat.value = false;
}

const lastItem = ref(null);

const setLastItem = (el) => {
  lastItem.value = el;
};

watch(
  () => captions.value.length,
  async () => {
    await nextTick();
    lastItem.value?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  },
);
</script>

<template>
  <main class="main-meeting" area-label="Meeting area">
    <section class="meeting-section" area-label="Meeting section area">
      <MeetingStage />

      <MeetingSidebar />
    </section>

    <CaptionPanel />

    <Emoji />

    <MeetingControl />
  </main>
</template>

<style src="../assets/styles/main-meeting.css"></style>
