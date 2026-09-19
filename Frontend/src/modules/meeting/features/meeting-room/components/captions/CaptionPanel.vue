<script setup></script>
<template>
  <div class="caption-section" area-label="Caption section area">
    <div class="caption-section__langs">
      <div class="caption-section__select-langs">
        <button class="cs-btn" type="button">
          <span class="cs-label">{{
            LANGS.find((v) => v.code === user.lang).label
          }}</span>
          <span class="cs-arrow">v</span>
        </button>

        <ul class="caption-section__">
          <li
            @click="user.lang = lang.code"
            v-for="lang in LANGS"
            class="cs-item"
            :class="{ active: lang.code === user.lang }"
          >
            {{ lang.label }}
          </li>
        </ul>
        ``
      </div>
    </div>
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
  </div>
</template>
