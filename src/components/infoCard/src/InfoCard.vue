<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()
const router = useRouter()
//获取信息
const list = computed(() => [
  {
    label: '文章',
    url: '/main',
    count: store.state.article.allCount ?? 0
  },
  {
    label: '分类',
    url: 'category',
    count: store.state.category.allCount ?? 0
  },
  {
    label: '年龄',
    url: '',
    count: 20
  }
])

const to = (url: string) => {
  //如果要跳转到main路由
  if (url === '/main') {
    //如果当前就是main路由，就重新获取article，否则就前往
    route.path === '/main' ? store.dispatch('article/getDataList') : router.push(url)
    //修改store中的状态为所有
    store.commit('changeCurrentCategory', '所有')
  } else router.push(url)
}
</script>
<template>
  <div class="info-card">
    <img class="photo-background" src="https://img.jzsp66.xyz/infoBg.3adec593.webp" alt="" />

    <img class="avatar" src="https://img.jzsp66.xyz/avatar.b89079e1.jpg" alt="" />
    <div class="name">睡前不看手机的勾勾</div>
    <div class="labelList">
      <div class="label-item" v-for="item in list" @click="to(item.url)" :key="item.url">
        <div class="count">{{ item.count }}</div>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.info-card {
  width: 100%;
  background-color: white;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.5);
  .photo-background {
    height: 8rem;
    width: 100%;
    object-fit: cover;
    border-radius: 0.4rem 0.4rem 0 0;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    margin-top: -3rem;
    border: 0.25rem solid rgba(255, 255, 255, 0.3);
  }

  .name {
    margin: 1rem 0;
    font-size: 1rem;
    font-weight: 500;
  }

  .labelList {
    display: flex;
    width: 100%;
    .label-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.6rem;
      cursor: pointer;
      .label {
        margin: 0.6rem 0;
        font-weight: 500;
      }
      .count {
        color: dodgerblue;
        font-weight: bold;
      }
    }
  }
}
</style>
