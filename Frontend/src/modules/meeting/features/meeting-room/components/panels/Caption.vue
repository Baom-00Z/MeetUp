<template>
  <div class="caption-section">
    <div class="select-langs">
      <div class="cs-select" data-value="vi-VN">
        <button class="cs-btn" type="button">
          <span class="cs-label">{{
            LANGS.find((v) => v.code === user.lang).label
          }}</span>
          <span class="cs-arrow">v</span>
        </button>

        <ul class="cs-list">
          <li
            @click="user.lang = lang.code"
            v-for="lang in LANGS"
            class="cs-item"
            :class="{ active: lang.code === user.lang }"
          >
            {{ lang.label }}
          </li>
        </ul>
      </div>
    </div>
    <div class="caption">
      <div
        class="text"
        v-for="(caption, i) in captions"
        :style="{
          color: caption.socketId === socket.id ? '#2563EB' : 'white',
        }"
        :key="Date.now() + Math.random()"
        :ref="i === captions.length - 1 ? setLastItem : null"
      >
        {{
          caption.socketId === socket.id
            ? "You"
            : users.find((v) => v.socketId === caption.socketId).name
        }}: {{ caption.caption }}
      </div>
    </div>
  </div>
</template>
