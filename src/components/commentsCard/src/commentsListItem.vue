<script lang="ts" setup>
import { ref, computed, PropType } from 'vue'
import { formatUtcString } from '@/utils/data-formate'
import commentsListItem from './commentsListItem.vue'
import commentInput from './commentInput.vue'
import { Comment } from '@/store/comment/types'
// eslint-disable-next-line no-undef
const props = defineProps({
  item: {
    type: Object as PropType<Comment>,
    default: () => ({})
  }
})
const showReply = ref(false)

//TODO:完善评论逻辑
const clickReply = (name: string) => {
  showReply.value = !showReply.value
}

const status = computed(() => {
  return props.item.status ? props.item.status + '地说道' : ''
})
</script>
<template>
  <div class="comments-list-item">
    <img class="avatar" :src="item.avatar" alt="" />
    <div class="detail">
      <div class="name">{{ item.name }}{{ status }}</div>
      <div class="createTime">
        <div class="time">
          {{ formatUtcString(item.createTime, 'YY-MM-DD hh:mm') }}
        </div>
        <div class="reply" @click="clickReply(item.name)">回复</div>
      </div>
      <p class="content" v-html="item.content"></p>
      <transition name="wjj">
        <comment-input
          v-show="showReply"
          :item="item"
          @closeReply="() => (showReply = false)"
          v-bind="$attrs"
        />
      </transition>
      <div class="replyList">
        <comments-list-item
          v-bind="$attrs"
          v-for="i in item.replyList"
          :key="i._id"
          :item="i"
        />
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comments-list-item {
  margin: 1.3rem 0;
  display: flex;
  .avatar {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    margin-right: 15px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.5s;
    &:hover {
      transform: rotate(360deg);
    }
  }
  .detail {
    flex: 1;
    font-size: 0.875rem;
    color: #b2b2b5;
    font-weight: lighter;
    .name {
      line-height: 1.5;
      color: rgb(134, 140, 144);
      cursor: pointer;
      &:hover {
        color: red;
      }
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
    & :deep(a) {
      color: rgb(255, 152, 0);
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
