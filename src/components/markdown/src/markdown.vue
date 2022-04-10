<script lang="ts">
import { defineComponent } from 'vue'
import { useMarkdown } from '../index'

export default defineComponent({
  name: 'App',
  emits: ['loaded', 'showImg', 'titleMenu'],
  props: {
    categoryName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const content = useMarkdown(props, emit)
    return {
      content
    }
  }
})
</script>
<template>
  <div style="padding: 4px" class="markdown-body" v-html="content"></div>
</template>
<style lang="less" scoped></style>
