<script setup>
import Tooltip from '../ui/Tooltip.vue';
import IconEmoji from '../icons/IconEmoji.vue';
</script>

<template>
    <button id="emoji" class="btn-common emoji">
        <IconEmoji></IconEmoji>
        <Tooltip>Emoji</Tooltip>
    </button>
</template>