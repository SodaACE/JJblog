<template>
  <div class="bg">
    <div class="loading">Loading{{ dot }}</div>
    <div class="box1"></div>
    <div class="box2"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const dot = ref('...')
setInterval(() => {
  if (dot.value.length >= 3) {
    dot.value = '.'
  } else {
    dot.value += '.'
  }
}, 500)
</script>

<style scoped>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgb(55, 71, 79);
}
.loading {
  z-index: 10;
  position: absolute;
  color: white;
  font-size: 15px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.box1,
.box2 {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  background-color: rgb(55, 71, 79);
}
.box1 {
  overflow: hidden;
  border: 3px solid rgb(63, 249, 220);
  transform: translateY(-50%) translateX(-50%) rotate(45deg);
  animation: box1 4s linear infinite alternate-reverse;
}
.box2 {
  border: 3px solid rgb(255, 171, 145);
  transform: translateY(-50%) translateX(-50%) rotate(90deg);
  animation: box2 4s linear infinite alternate-reverse;
}
@keyframes box1 {
  from {
    transform: translateY(-50%) translateX(-50%) rotate(45deg);
  }
  25% {
    transform: translateY(-50%) translateX(-50%) rotate(135deg);
  }
  50% {
    transform: translateY(-50%) translateX(-50%) rotate(225deg);
  }
  75% {
    transform: translateY(-50%) translateX(-50%) rotate(315deg);
  }
  to {
    transform: translateY(-50%) translateX(-50%) rotate(405deg);
  }
}
@keyframes box2 {
  from {
    transform: translateY(-50%) translateX(-50%) rotate(0deg);
  }
  25% {
    transform: translateY(-50%) translateX(-50%) rotate(-90deg);
  }
  50% {
    transform: translateY(-50%) translateX(-50%) rotate(-180deg);
  }
  75% {
    transform: translateY(-50%) translateX(-50%) rotate(-270deg);
  }
  to {
    transform: translateY(-50%) translateX(-50%) rotate(-360deg);
  }
}
</style>
