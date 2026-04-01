<template>
  <div class="app">
    <VisualEditor />
  </div>
</template>

<script setup>
import { VisualEditor } from "./index.js";
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Fira+Sans:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Fira Sans', sans-serif;
  background: #f5f3ff;
}

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
