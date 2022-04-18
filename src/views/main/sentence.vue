<script lang="ts" setup>
// 获取可以时刻变化的sentence
import { useShowSentence } from './index'

const sentence = useShowSentence(
  'Welcome to my website, I will be here to share my study notes'
)
</script>
<template>
  <div>{{ sentence }} |</div>
</template>
<style lang="less" scoped></style>
