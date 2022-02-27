<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { computed } from 'vue'
const store = useStore()
const route = useRoute()
const list = computed(() => [
  {
    label: '文章',
    url: '/main',
    count: store.state.article.allCount
  },
  {
    label: '分类',
    url: 'category',
    count: store.state.category.allCount
  },
  {
    label: '年龄',
    url: '',
    count: 20
  }
])
const router = useRouter()
const to = (url) => {
  if (url === '/main') {
    route.path === '/main'
      ? store.dispatch('article/getDataList')
      : router.push(url)
    store.commit('changeCurrentCategory', '所有')
  } else router.push(url)
}
store.dispatch('category/getDataList')
store.dispatch('article/getDataList')
</script>
<template>
  <div class="info-card">
    <img class="photo-background" src="../../../assets/css/infoBg.png" alt="" />

    <img class="avatar" src="../../../assets/icon/avatar.jpg" alt="" />
    <div class="name">睡前不看手机的勾勾</div>
    <!--    <div class="description">想让和泉纱雾当我妹妹的死宅</div>-->
    <div class="labelList">
      <div
        class="label-item"
        v-for="item in list"
        @click="to(item.url)"
        :key="item.url"
      >
        <div class="count">{{ item.count }}</div>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media only screen and (max-width: 600px) {
  .info-card {
    width: 97vw;
  }
}
@media screen and (max-width: 1150px) and (min-width: 601px) {
  .info-card {
    width: 80vw;
  }
}
@media only screen and (min-width: 1151px) {
  .info-card {
    width: 300px;
  }
}
.info-card {
  background-color: white;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.5);
  .photo-background {
    height: 130px;
    width: 100%;
    object-fit: cover;
    border-radius: 0.4rem 0.4rem 0 0;
  }
  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-top: -50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
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
      margin-bottom: 10px;
      cursor: pointer;
      .label {
        margin: 10px 0;
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
