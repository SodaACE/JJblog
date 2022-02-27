<script lang="ts" setup>
import { useStore } from '@/store'
// eslint-disable-next-line no-undef
defineProps({
  list: Array
})
// eslint-disable-next-line no-undef
const emits = defineEmits(['categoryClick'])
const store = useStore()
const itemClick = (category) => {
  emits('categoryClick', category)
  store.commit('changeCurrentCategory', category.categoryName)
}
</script>
<template>
  <div class="classify-card clearfix">
    <div class="title">
      <el-icon :size="20"><folder-opened /></el-icon>
      <h4>所有分类</h4>
    </div>
    <div class="menu">
      <el-menu class="el-menu-vertical-demo">
        <el-menu-item
          v-for="(category, index) in list"
          :index="index + ''"
          :key="category._id"
          @click="itemClick(category)"
        >
          <el-icon><folder /></el-icon>
          <span>{{ category.categoryName }}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media only screen and (max-width: 600px) {
  .classify-card {
    width: 97vw;
  }
}
@media screen and (max-width: 1150px) and (min-width: 601px) {
  .classify-card {
    width: 80vw;
  }
}
@media only screen and (min-width: 1151px) {
  .classify-card {
    width: 300px;
  }
}
.el-menu-item {
  height: 36px;
}
.classify-card {
  background-color: white;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.5);
  .title {
    display: flex;
    align-items: center;
    margin: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    h4 {
      margin: 15px 0;
      margin-left: 5px;
    }
  }
  .menu {
    padding: 20px 0;
    .el-menu {
      border: none;
    }
  }
}
</style>
