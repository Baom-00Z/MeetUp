<script setup>
// Lib VueJS
import { nextTick, onMounted, ref, watch } from "vue";
// Event JS
import { initEvents } from "@/assets/meeting/meeting-room/event";
// Components: Media
import VideoParticipant from "./components/media/VideoParticipant.vue";
import VideoScreen from "./components/media/VideoScreen.vue";
import Audio from "./components/media/Audio.vue";
// Components: Panels
import Chat from "./components/panels/Chat.vue";
import ParticipantList from "./components/panels/ParticipantList.vue";
// Component: Icon
import IconVerticalLine from "./components/icons/IconVerticalLine.vue";
import IconXDelete from "./components/icons/IconXDelete.vue";
// Component: Controls
import ButtonSlideShow from "@/components/meeting/meeting-room/controls/ButtonSlideShow.vue";
import ButtonEmoji from "@/components/meeting/meeting-room/controls/ButtonEmoji.vue";
import ButtonCaption from "@/components/meeting/meeting-room/controls/ButtonCaption.vue";
import ButtonHandUp from "@/components/meeting/meeting-room/controls/ButtonHandUp.vue";
import ButtonMore from "@/components/meeting/meeting-room/controls/ButtonMore.vue";
import ButtonCancelCall from "@/components/meeting/meeting-room/controls/ButtonCancelCall.vue";
import ButtonUsers from "@/components/meeting/meeting-room/controls/ButtonUsers.vue";
import ButtonChat from "@/components/meeting/meeting-room/controls/ButtonChat.vue";
import ButtonCamera from "@/components/meeting/meeting-room/controls/ButtonCamera.vue";
import ButtonMicro from "@/components/meeting/meeting-room/controls/ButtonMicro.vue";
import Caption from "./components/panels/Caption.vue";
import Emoji from "../components/emojis/Emoji.vue";
// Store

const meetingStore = useMeetingStore();
const { users, renderVideo, dataShareScreen, emoji, LANGS, user, captions } =
  storeToRefs(meetingStore);
const socketStore = useSocketStore();
const { socket } = storeToRefs(socketStore);

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

      <section
        :class="dataShareScreen.isSharingScreen ? 'present' : ''"
        class="screen-share"
        area-label="Screen share area"
      >
        <Audio
          v-if="
            dataShareScreen.isSharingScreen &&
            dataShareScreen.socketId &&
            dataShareScreen.socketId !== socket.id &&
            dataShareScreen.streams?.audio
          "
          :stream="dataShareScreen.streams.audio"
        ></Audio>
        <VideoScreen :user="dataShareScreen"></VideoScreen>
      </section>

      <section
        :class="dataShareScreen.isSharingScreen ? 'present' : ''"
        ref="VideoContainer"
        id="user-container"
        class="participant-videos"
        area-label="Participant videos area"
      >
        <Audio
          v-for="user in users.filter((u) => u.socketId !== socket.id)"
          v-if="user.isLive"
          :key="user.socketId"
          :stream="user.streams?.micro"
        >
        </Audio>
        <VideoParticipant
          v-for="user in renderVideo"
          :key="user.socketId"
          :user="user"
        ></VideoParticipant>
      </section>

      <aside
        :class="{ show: infoPanel }"
        class="meeting-sidebar"
        area-label="Meeting sidebar area"
      >
        <div class="meeting-sidebar__content">
          <div class="meeting-sidebar__header">
            <p class="meeting-sidebar__title">
              {{
                isChat ? "Message in meeting" : isUser ? "Participant list" : ""
              }}
            </p>
            <div class="meeting-sidebar__translate-btns">
              <button
                @click="isTranslated = false"
                :style="{ backgroundColor: !isTranslated ? '#A8C7FA' : '' }"
              >
                Bản gốc
              </button>
              <button
                @click="isTranslated = true"
                :style="{ backgroundColor: isTranslated ? '#A8C7FA' : '' }"
              >
                Bản dịch
              </button>
            </div>
            <button @click="closePanel" class="meeting-sidebar__close-btn">
              <IconXDelete />
            </button>
          </div>
          <Chat v-if="infoPanel && isChat" />
          <ParticipantList v-if="infoPanel && isUser"></ParticipantList>
        </div>
      </aside>

    </section>

    <Caption />

    <Emoji />

    <section class="control-section" area-label="Meeting control section">
      <div class="control-section__title">
        <TimeStart></TimeStart>
        <IconVerticalLine></IconVerticalLine>
        <Title></Title>
      </div>
      <div class="control-section__buttons">
        <EnumerateDevice></EnumerateDevice>
        <ButtonMicro></ButtonMicro>
        <ButtonCamera></ButtonCamera>
        <ButtonSlideShow></ButtonSlideShow>
        <ButtonEmoji></ButtonEmoji>
        <ButtonCaption></ButtonCaption>
        <ButtonHandUp></ButtonHandUp>
        <ButtonMore></ButtonMore>
        <ButtonCancelCall></ButtonCancelCall>
      </div>
      <div class="control-section__aside-buttons">
        <ButtonUsers @turn="handleUserClick" :isUser="isUser"></ButtonUsers>
        <ButtonChat @turn="handleChatClick" :isChat="isChat"></ButtonChat>
      </div>
    </section>
  </main>
</template>

<style src="@/assets/meeting/meeting-room/styles/general.css"></style>
