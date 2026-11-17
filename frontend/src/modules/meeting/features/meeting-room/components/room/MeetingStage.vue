<script setup>
import ScreenShareAudio from "../media/ScreenShareAudio.vue";
import ParticipantAudio from "../media/ParticipantAudio.vue";
import ParticipantVideo from "../media/ParticipantVideo.vue";
import ScreenShareVideo from "../media/ScreenShareVideo.vue";
</script>

<template>
  <section>
    <!-- Screen Share -->
    <div
      :class="dataShareScreen.isSharingScreen ? 'present' : ''"
      class="screen-share"
      area-label="Screen share area"
    >
      <ScreenShareAudio
        v-if="
          dataShareScreen.isSharingScreen &&
          dataShareScreen.socketId &&
          dataShareScreen.socketId !== socket.id &&
          dataShareScreen.streams?.audio
        "
        :stream="dataShareScreen.streams.audio"
      ></ScreenShareAudio>
      <ScreenShareVideo :user="dataShareScreen"></ScreenShareVideo>
    </div>

    <!-- Participant Videos -->
    <div
      :class="dataShareScreen.isSharingScreen ? 'present' : ''"
      ref="VideoContainer"
      id="user-container"
      class="participant-videos"
      area-label="Participant videos area"
    >
      <ParticipantAudio
        v-for="user in users.filter((u) => u.socketId !== socket.id)"
        v-if="user.isLive"
        :key="user.socketId"
        :stream="user.streams?.micro"
      >
      </ParticipantAudio>
      <ParticipantVideo
        v-for="user in renderVideo"
        :key="user.socketId"
        :user="user"
      ></ParticipantVideo>
    </div>
  </section>
</template>
