<script lang="ts" setup>
import foldItem from './foldItem.vue'
import { menuItem } from '../useMenu'

// eslint-disable-next-line no-undef
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
const scrollToItem = (item: menuItem) => {
  let type = item.type
  let index = item.index
  let target = document.querySelectorAll(`h${type}`)[index]
  let t = document.querySelector(`.content`)
  console.log(item)
  window.scrollTo({
    top: target.offsetTop + t.offsetTop - 10, //相当于定位元素的垂直偏移量
    left: 0,
    behavior: 'smooth'
  })
}
</script>
<template>
  <template v-if="item.children.length">
    <el-sub-menu :index="item.title">
      <template #title>
        <div class="title" v-html="item.title"></div>
      </template>
      <fold-item
        v-for="i in item.children"
        :key="i.title"
        :item="i"
      ></fold-item>
    </el-sub-menu>
  </template>
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
