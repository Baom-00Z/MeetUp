<script>
import IconXDelete from "../icons/IconXDelete.vue";
</script>

<template>
  <aside
    :class="{ show: infoPanel }"
    class="meeting-sidebar"
    area-label="Meeting sidebar area"
  >
    <div class="meeting-sidebar__content">
      <div class="meeting-sidebar__header">
        <p class="meeting-sidebar__title">
          {{ isChat ? "Message in meeting" : isUser ? "Participant list" : "" }}
        </p>
        <div class="meeting-sidebar__translate-btns">
          <button
            @click="isTranslated = false"
            :style="{ backgroundColor: !isTranslated ? '#A8C7FA' : '' }"
          >
            Original
          </button>
          <button
            @click="isTranslated = true"
            :style="{ backgroundColor: isTranslated ? '#A8C7FA' : '' }"
          >
            Translation
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
</template>
