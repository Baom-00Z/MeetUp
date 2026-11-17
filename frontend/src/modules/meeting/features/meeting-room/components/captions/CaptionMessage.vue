<script setup></script>

<template>
  <div class="caption-section__messages">
    <div
      v-for="(value, index) in captions"
      :style="{
        color: value.socketId === socket.id ? '#2563EB' : 'white',
      }"
      :key="Date.now() + Math.random()"
      :ref="index === captions.length - 1 ? setLastItem : null"
      class="caption-section__message"
    >
      {{
        value.socketId === socket.id
          ? "You"
          : users.find((v) => v.socketId === value.socketId).name
      }}: {{ value.caption }}
    </div>
  </div>
</template>
