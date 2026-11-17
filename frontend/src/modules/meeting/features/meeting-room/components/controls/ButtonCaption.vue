<script setup>
import Tooltip from '../ui/Tooltip.vue';
import IconCaption from '../icons/IconCaption.vue';

</script>

<template>
    <button id="caption" class="btn-common">
        <IconCaption></IconCaption>
        <Tooltip>Caption</Tooltip>
    </button>
</template>