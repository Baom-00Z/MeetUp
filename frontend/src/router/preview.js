import { createRouter, createWebHistory } from 'vue-router';
import MeetingRoom from '@/modules/meeting/features/meeting-room/pages/MeetingRoom.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/meeting/preview' },
        { path: '/meeting/:id', component: MeetingRoom },
    ],
});
