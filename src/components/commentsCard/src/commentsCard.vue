<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { Comment } from '@/store/comment/types'
import commentInput from './commentInput.vue'
import commentsListItem from './commentsListItem.vue'

defineProps({
  commentList: {
    type: Array as PropType<Comment[]>
  }
})
</script>
<template>
  <div class="comment-input">
    <comment-input v-bind="$attrs" />
  </div>
  <div class="comments-content">
    <template v-for="item in commentList" :key="item._id">
      <comments-list-item :item="item" v-bind="$attrs" />
    </template>
  </div>
</template>
<style lang="less" scoped>
.comments-content {
  margin-top: 2px;
  padding: 20px;
  background-color: white;

  // 目的是只让外层的评论有分割线
  & > .comments-list-item {
    border-bottom: 1px solid rgb(238, 242, 247);
  }
}
</style>
