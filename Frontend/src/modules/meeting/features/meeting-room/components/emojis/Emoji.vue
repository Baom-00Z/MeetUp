
<script setup></script>

<template>
  <div class="emoji-section">
    <div class="emoji-section__list">
      <button @click="meetingStore.showEmoji(value.id)" v-for="value in emoji">
        <span>{{ value.emoji }}</span>
      </button>
    </div>
  </div>
</template>
s