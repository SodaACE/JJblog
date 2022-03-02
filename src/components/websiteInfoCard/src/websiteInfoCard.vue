<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue'
const store = useStore()
const list = computed(() => [
  {
    label: '文章数目',
    content: store.state.article.allCount ?? 0 + '篇'
  },
  {
    label: '文章总访问量',
    content: '你猜猜~'
  },
  {
    label: '开发周期',
    content: '9天'
  },
  {
    label: '开发时间',
    content: '2022-02-18'
  },

  {
    label: '最后更新时间',
    content: '2022-02-26'
  }
])
</script>
<template>
  <div class="website-info-card clearfix">
    <div class="title">
      <slot name="title">
        <el-icon :size="20"><house /></el-icon>
        <h4>网站信息</h4>
      </slot>
    </div>
    <div class="website-info">
      <slot name="content">
        <div class="item" v-for="item in list" :key="item.label">
          <div class="label">{{ item.label }}:</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media only screen and (max-width: 600px) {
  .website-info-card {
    width: 97vw;
  }
}
@media screen and (max-width: 1150px) and (min-width: 601px) {
  .website-info-card {
    width: 80vw;
  }
}
@media only screen and (min-width: 1151px) {
  .website-info-card {
    width: 300px;
  }
}
.website-info-card {
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  .title {
    display: flex;
    align-items: center;
    margin: 0 20px 10px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    h4 {
      margin: 15px 0;
      margin-left: 5px;
      font-weight: 500;
    }
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 25px;
    font-size: 14px;
    &:last-of-type {
      margin-bottom: 10px;
    }
    div {
      font-weight: 500;
    }
  }
}
</style>
