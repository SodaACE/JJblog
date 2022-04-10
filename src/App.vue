<script lang="ts" setup>
import { isLoading } from '@/service'
import LoadingBox from '@/components/loadingBox'
</script>

<template>
  <transition name="wjj">
    <loading-box v-show="isLoading"></loading-box>
  </transition>
  <router-view></router-view>
</template>

<style lang="less" scoped>
.wjj-enter-active,
.wjj-leave-active {
  transition: all 0.3s;
}
.wjj-enter-from,
.wjj-leave-to {
  opacity: 0;
}
</style>
