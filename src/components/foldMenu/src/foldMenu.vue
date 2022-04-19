<script lang="ts" setup>
import { menuItem } from '..'
import foldItem from './foldItem.vue'
import { PropType } from 'vue'
// eslint-disable-next-line no-undef
defineProps({
  menu: {
    type: Array as PropType<menuItem[]>,
    default: () => []
  }
})
</script>
<template>
  <div class="menu-title">目录</div>
  <el-menu>
    <fold-item
      v-for="item in menu"
      :key="item.title"
      :item="item"
    ></fold-item>
  </el-menu>
</template>
<style lang="less" scoped>
::v-deep.el-menu {
  border: none;
}
.menu-title {
  text-align: center;
  margin-bottom: 10px;
}
</style>
