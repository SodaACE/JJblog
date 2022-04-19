<script lang="ts" setup>
import navHeader from '@/components/nav-header'
</script>
<template>
  <div class="app">
    <div class="bg"></div>
    <navHeader style="position: absolute" />
    <router-view v-slot="{ Component }">
      <transition name="wjj" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
    <el-backtop />
  </div>
</template>
<style lang="less" scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    background: var(--content-bg);
    background-size: cover;
    background-position: center;
  }
}
.wjj-enter-active,
.wjj-leave-active {
  transition: all 0.3s;
}
.wjj-enter-from,
.wjj-leave-to {
  opacity: 0;
}
</style>
