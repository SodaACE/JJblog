<script lang="ts" setup>
import { ref, computed } from 'vue'
import commentsListItem from './commentsListItem.vue'
import commentInput from './commentInput.vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const showReply = ref(false)

const clickReply = (name: string) => {
  showReply.value = !showReply.value
}

const status = computed(() => {
  return props.item.status ? props.item.status + '地说道' : ''
})
</script>
<template>
  <div class="comments-list-item">
    <img class="avatar" :src="item.imgurl" alt="" />
    <div class="detail">
      <div class="name">{{ item.name }}{{ status }}</div>
      <div class="createTime">
        <div class="time">
          {{ $filters.formatTime(item.createTIme) }}
        </div>
        <div class="reply" @click="clickReply(item.name)">回复</div>
      </div>
      <p class="content">{{ item.comment }}</p>
      <transition name="wjj">
        <comment-input v-show="showReply"></comment-input>
      </transition>
      <div class="replyList">
        <comments-list-item
          v-for="i in item.replyList"
          :key="i.createTime"
          :item="i"
        ></comments-list-item>
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

.wjj-enter-from,
.wjj-leave-to {
  opacity: 0;
}
.wjj-enter-active {
  transition: all 0.3s;
}
.wjj-leave-active {
  transition: all 0.3s;
}
</style>
