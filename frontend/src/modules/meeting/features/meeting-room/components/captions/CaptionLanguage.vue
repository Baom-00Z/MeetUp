<script setup>


</script>

<template>
  <div class="caption-section__select-langs">
    <button class="caption-section__select-lang-btn" type="button">
      <span class="caption-section__select-lang-label">{{
        LANGS.find((v) => v.code === user.lang).label
      }}</span>
      <span class="caption-section__select-lang-arrow">v</span>
    </button>

    <ul class="caption-section__list-langs">
      <li
        @click="user.lang = lang.code"
        v-for="lang in LANGS"
        :class="{ active: lang.code === user.lang }"
        class="caption-section__item-lang"
      >
        {{ lang.label }}
      </li>
    </ul>
  </div>
</template>
