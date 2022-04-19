<script lang="ts" setup>
import foldItem from './foldItem.vue'
import { PropType } from 'vue'
import { menuItem } from '../index'

// eslint-disable-next-line no-undef
defineProps({
  item: {
    type: Object as PropType<menuItem>,
    default: () => ({})
  }
})
const scrollToItem = (item: menuItem) => {
  // 用于获取对应的h标签
  const { index, type } = item

  //获取容器
  const container: HTMLElement | null =
    document.querySelector(`.content`)

  //找到对应的元素
  const target: HTMLElement | null = container
    ? container.querySelectorAll<HTMLElement>(`h${type}`)[index]
    : null
  if (target && container)
    window.scrollTo({
      top: target.offsetTop + container.offsetTop - 10, //相当于定位元素的垂直偏移量
      left: 0
      // behavior: 'smooth'
    })
}
</script>
<template>
  <!--  如果有孩子，就渲染成sub-menu-->
  <template v-if="item.children.length">
    <el-sub-menu :index="item.title">
      <template #title>
        <div class="title" v-html="item.title"></div>
      </template>
      <!-- 子目录内部渲染fold-item组件，递归组件的核心 -->
      <fold-item
        v-for="i in item.children"
        :key="i.title"
        :item="i"
      ></fold-item>
    </el-sub-menu>
  </template>
  <!--  否则就渲染成menu-item-->
  <template v-else>
    <el-menu-item :index="item.title" @click="scrollToItem(item)">
      <template #title>
        <div class="title" v-html="item.title"></div>
      </template>
    </el-menu-item>
  </template>
</template>
<style lang="less" scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

::v-deep.el-menu-item {
  width: 220px;
  line-height: 30px;
  height: 30px;
}
::v-deep.el-sub-menu {
  width: 220px;
}
::v-deep .el-sub-menu__title {
  height: 30px;
  line-height: 30px;
}
</style>
