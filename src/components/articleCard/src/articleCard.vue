<script lang="ts" setup>
import { defineProps, PropType } from 'vue'
import { Article } from '@/store/article/types'
import { formatUtcString } from '@/utils/data-formate'
defineProps({
  item: {
    type: Object as PropType<Article>,
    default: () => ({})
  },
  index: {
    type: Number,
    default: 0
  }
})
</script>
<template>
  <div class="article">
    <el-image
      :lazy="index > 1"
      fit="cover"
      class="image"
      :src="
        'https://tenapi.cn/acg?time=' +
        Math.floor(Math.random() * 100)
      "
    />
    <div class="title">{{ item.title }}</div>
    <div class="article-info">
      <div class="description">{{ item.description }}</div>
      <div class="info-list">
        <img src="@/assets/icon/time.png" alt="" />
        <span>{{ formatUtcString(item.createTime) }}</span>
        <img src="@/assets/icon/folder-fill.png" alt="" />
        <span>{{ item.categoryName }}</span>
        <img src="@/assets/icon/see.png" alt="" />
        <span>{{ item.count }}次阅读</span>
      </div>
    </div>
    <div class="index">{{ index + 1 }}</div>
  </div>
</template>
<style lang="less" scoped>
@media (max-width: 600px) {
  // .article-info {
  //   font-size: 12px;
  // }

  // .title {
  //   font-size: 1.5rem;
  // }
}
@media (max-width: 1150px) and (min-width: 601px) {
  // .article-info {
  //   font-size: 12px;
  // }

  // .title {
  //   font-size: 1.5rem;
  // }
}
@media (min-width: 1151px) {
  // .title {
  //   font-size: 2rem;
  // }
}
.article {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.4rem;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.5);
  .index {
    position: absolute;
    background-color: dodgerblue;
    width: 5rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    transform: rotate(-45deg);
    color: white;
    left: -1.5rem;
    top: 0.5rem;
  }
  .image {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    border-radius: 0.4rem;
    object-fit: cover;
  }
  .title {
    color: white;
    text-shadow: 0 0 0.2rem #fff;
    transition: all 0.5s;
    cursor: pointer;
  }
  &:hover .title {
    transform: translateY(-20px);
    font-size: 1.8rem;
  }

  &:hover {
    box-shadow: 0px 0px 0.4rem rgba(0, 0, 0, 0.7);
  }
  .article-info {
    width: 100%;
    color: white;
    opacity: 1;
    position: absolute;
    bottom: 10px;
    transition: all 0.5s;

    .description {
      padding: 1rem 1rem;
      font-size: 1.3em;
      margin: 0 0.7rem 0.5rem 0.7rem;
      border-bottom: 1px solid white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info-list {
      display: flex;
      align-items: center;

      div {
        margin-left: 0.8rem;
      }

      img {
        width: 1.2rem;
        height: 1.2rem;
        margin: 0 0.3rem 0 0.7rem;
      }
    }
  }
}
</style>
