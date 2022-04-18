<script lang="ts" setup>
import { ref } from 'vue'
import commentInput from './commentInput.vue'
import commentsListItem from './commentsListItem.vue'

const commentsList = ref([
  {
    imgurl:
      'https://gravatar.loli.net/avatar/ecc328b99604a0a17b5d80921eb377d2?d=mp&v=1.4.16',
    name: '睡前不看手机',
    email: '948065841@qq.com',
    status: '',
    createTime: new Date(),
    comment:
      '这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这' +
      '是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试' +
      '这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是' +
      '测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试'
  },
  {
    imgurl:
      'https://q2.qlogo.cn/headimg_dl?dst_uin=948065123&spec=100',
    name: '睡前不看手机',
    email: '948065841@qq.com',
    status: '蚌埠住了',
    createTime: new Date(),
    comment:
      '这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这' +
      '是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试' +
      '这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是' +
      '测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试'
  },
  {
    imgurl:
      'https://gravatar.loli.net/avatar/cc2c230b42f7823fe819f40d7e06532a?d=mp&v=1.4.16',
    name: '睡前不看手机',
    email: '948065841@qq.com',
    status: '开心',
    createTime: new Date(),
    comment:
      '这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这' +
      '是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试' +
      '这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是' +
      '测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试这是测试',
    replyList: [
      {
        imgurl:
          'https://gravatar.loli.net/avatar/cc2c230b42f7823fe819f40d7e06532a?d=mp&v=1.4.16',
        name: '睡前不看手机',
        email: '948065841@qq.com',
        status: '开心',
        createTime: new Date(),
        comment: '我回复了睡前不看手机，你是煞笔'
      },
      {
        imgurl:
          'https://gravatar.loli.net/avatar/cc2c230b42f7823fe819f40d7e06532a?d=mp&v=1.4.16',
        name: '睡前不看手机',
        email: '948065841@qq.com',
        status: '开心',
        createTime: new Date(),
        comment: '我回复了睡前不看手机，你是煞笔'
      },
      {
        imgurl:
          'https://gravatar.loli.net/avatar/cc2c230b42f7823fe819f40d7e06532a?d=mp&v=1.4.16',
        name: '睡前不看手机',
        email: '948065841@qq.com',
        status: '开心',
        createTime: new Date(),
        comment: '我回复了睡前不看手机，你是煞笔'
      }
    ]
  }
])
</script>
<template>
  <div>
    <div class="comment-input">
      <comment-input />
    </div>
    <div class="comments-content">
      <template v-for="item in commentsList" :key="item.createTime">
        <comments-list-item class="item" :item="item" />
      </template>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
