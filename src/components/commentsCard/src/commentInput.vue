<script lang="ts" setup>
import { emojis } from '@/components/commentsCard/src/emoji'
import { ref, defineProps, PropType, defineEmits } from 'vue'
import { useCommentInfo } from '../index'
import { Comment } from '@/store/comment/types'
import { createComment } from '@/service/comments'
const emit = defineEmits(['closeReply'])
const props = defineProps({
  item: {
    type: Object as PropType<Comment | undefined>,
    default: () => undefined
  },
  articleTitle: {
    type: String,
    default: ''
  }
})
const showEmojis = ref(false)
const { content, info, findInfoByQQ } = useCommentInfo()
const submit = async () => {
  // 如果传入了item，那么就是回复，否则就是评论
  const metadata: Comment = props.item
    ? {
        type: '0',
        replyId: props.item._id,
        parent: props.item.parent,
        content: content.value,
        title: props.articleTitle,
        ...info
      }
    : {
        type: '1',
        content: content.value,
        title: props.articleTitle,
        ...info
      }
  const res = await createComment(metadata)
  emit('closeReply')
}
</script>
<template>
  <div class="comment">
    <div class="info-bar">
      <input
        type="text"
        placeholder="昵称 ( QQ )"
        v-model="info.name"
        @blur="findInfoByQQ"
      />
      <input type="text" placeholder="邮箱" :value="info.email" />
      <input
        type="text"
        placeholder="心情，5字以内哦~🥵"
        maxlength="5"
        v-model="info.status"
      />
    </div>
    <textarea
      class="comment-input"
      v-model="content"
      placeholder="留下你的足迹..."
    />
    <div class="foot-bar">
      <div class="button-content">
        <span
          class="icon"
          @click="showEmojis = !showEmojis"
          :class="{ active: showEmojis }"
        >
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="16172"
            width="22"
            height="22"
          >
            <path
              d="M512 1024a512 512 0 1 1 512-512 512 512 0 0 1-512 512zM512 56.888889a455.111111 455.111111 0 1 0 455.111111 455.111111 455.111111 455.111111 0 0 0-455.111111-455.111111zM312.888889 512A85.333333 85.333333 0 1 1 398.222222 426.666667 85.333333 85.333333 0 0 1 312.888889 512z"
              p-id="16173"
            ></path>
            <path
              d="M512 768A142.222222 142.222222 0 0 1 369.777778 625.777778a28.444444 28.444444 0 0 1 56.888889 0 85.333333 85.333333 0 0 0 170.666666 0 28.444444 28.444444 0 0 1 56.888889 0A142.222222 142.222222 0 0 1 512 768z"
              p-id="16174"
            ></path>
            <path
              d="M782.222222 391.964444l-113.777778 59.733334a29.013333 29.013333 0 0 1-38.684444-10.808889 28.444444 28.444444 0 0 1 10.24-38.684445l113.777778-56.888888a28.444444 28.444444 0 0 1 38.684444 10.24 28.444444 28.444444 0 0 1-10.24 36.408888z"
              p-id="16175"
            ></path>
            <path
              d="M640.568889 451.697778l113.777778 56.888889a27.875556 27.875556 0 0 0 38.684444-10.24 27.875556 27.875556 0 0 0-10.24-38.684445l-113.777778-56.888889a28.444444 28.444444 0 0 0-38.684444 10.808889 28.444444 28.444444 0 0 0 10.24 38.115556z"
              p-id="16176"
            ></path>
          </svg>
        </span>
        <el-button style="color: #b2b2b5" @click="submit">
          提交
        </el-button>
      </div>
      <div class="emojis" v-show="showEmojis">
        <div
          v-for="item in emojis"
          :key="item"
          @click="content += item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media screen and (max-width: 800px) {
  .info-bar {
    flex-direction: column;
    input {
      width: 95% !important;
    }
  }
}

input,
textarea {
  font-size: 0.9rem;
}
.comment {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 10px;
  .info-bar {
    width: 100%;
    display: flex;
    input {
      width: 33.3%;
      border: none;
      outline: none;
      padding: 10px 5px;
      margin: 0 5px;
      color: #b2b2b5;
      line-height: 1.5;
      border-bottom: 1px #dedede dashed;
      &::-webkit-input-placeholder {
        color: #dedede;
      }

      &:focus {
        border-bottom: 1px #d27bd7 dashed;
      }
    }
  }

  .comment-input {
    width: 100%;
    resize: vertical;
    box-sizing: border-box;
    min-height: 150px;
    height: 150px;
    max-height: 220px;
    margin-top: 10px;
    padding: 10px 5px;
    outline: none;
    border: none;
    color: #b2b2b5;
    letter-spacing: 2px;
    line-height: 1.4;
    &::-webkit-input-placeholder {
      color: #dedede;
    }
  }

  .foot-bar {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    .button-content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .active {
      fill: dodgerblue !important;
    }
    .icon {
      fill: #b2b2b5;
      margin-right: 8px;
      cursor: pointer;
    }
    .emojis {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      div {
        font-size: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
