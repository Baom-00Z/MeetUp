<script setup>
import ButtonCam from "../controls/ButtonCam.vue";
import ButtonCancel from "../controls/ButtonCancel.vue";
import ButtonCaption from "../controls/ButtonCaption.vue";
import ButtonChat from "../controls/ButtonChat.vue";
import ButtonEmoji from "../controls/ButtonEmoji.vue";
import ButtonHandUp from "../controls/ButtonHandUp.vue";
import ButtonMic from "../controls/ButtonMic.vue";
import ButtonMore from "../controls/ButtonMore.vue";
import ButtonParticipants from "../controls/ButtonParticipants.vue";
import ButtonSlideShow from "../controls/ButtonSlideShow.vue";
import IconVerticalLine from "../icons/IconVerticalLine.vue";
import Time from "../ui/Time.vue";
import Title from "../ui/Title.vue";
</script>

<template>
  <section class="meeting-controls" area-label="Meeting control section">
    <div class="meeting-controls__info">
      <Time></Time>
      <IconVerticalLine></IconVerticalLine>
      <Title></Title>
    </div>
    <div class="meeting-controls__actions">
      <ButtonMic></ButtonMic>
      <ButtonCam></ButtonCam>
      <ButtonSlideShow></ButtonSlideShow>
      <ButtonEmoji></ButtonEmoji>
      <ButtonCaption></ButtonCaption>
      <ButtonHandUp></ButtonHandUp>
      <ButtonMore></ButtonMore>
      <ButtonCancel></ButtonCancel>
    </div>
    <div class="meeting-controls__sidebar-toggles">
      <ButtonParticipants></ButtonParticipants>
      <ButtonChat></ButtonChat>
    </div>
  </section>
</template>
