<script lang="ts" setup>
import { ref } from 'vue'
import commentsListItem from './commentsListItem.vue'
import commentInput from './commentInput.vue'
// eslint-disable-next-line no-undef
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const showReply = ref(false)
</script>
<template>
  <div class="comments-list-item">
    <img class="avatar" :src="item.imgurl" alt="" />
    <div class="detail">
      <div class="name">{{ item.name }}</div>
      <div class="createTime">
        <div class="time">2019-06-29</div>
        <div class="reply" @click="showReply = !showReply">回复</div>
      </div>
      <p class="content">{{ item.comment }}</p>
      <comment-input v-show="showReply"></comment-input>
      <div class="replyList">
        <template v-for="i in item.replyList" :key="i.createTime">
          <comments-list-item :item="i"></comments-list-item>
        </template>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comments-list-item {
  margin: 30px 0;
  display: flex;
  .avatar {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    margin-right: 15px;
  }
  .detail {
    flex: 1;
    font-size: 0.875rem;
    color: #b2b2b5;
    font-weight: lighter;
    .name {
      line-height: 1.5;
      color: rgb(134, 140, 144);
    }
    .createTime {
      margin-top: 5px;
      line-height: 1.5;
      font-size: 0.75rem;
      display: flex;
      justify-content: space-between;
      .reply {
        cursor: pointer;
        display: none;
        &:hover {
          color: #eb5055;
        }
      }
    }
    .content {
      line-height: 1.75;
    }
    &:hover .reply {
      display: block;
    }
  }
}
</style>
