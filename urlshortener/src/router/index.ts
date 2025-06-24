import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/not-found',
        name: 'NotFound',
        component: NotFoundView
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

