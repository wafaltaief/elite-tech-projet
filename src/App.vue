<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';

const routes = [
  { path: '/', component: HomePage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
</script>

<style>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
</style>