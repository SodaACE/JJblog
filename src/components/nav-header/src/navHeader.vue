<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
const router = useRouter()
const store = useStore()
const list = ref([
  { label: '搜索', url: '', icon: 'search' },
  { label: '主页', url: '/main', icon: 'house' },
  { label: '分类', url: '/category', icon: 'folder' },
  { label: '留言板', url: '', icon: 'mug' },
  { label: '关于', url: '/about', icon: '' }
])
const table = computed(() => store.state.showMobileDrawer)
const to = (url: any) => {
  if (url === '/main') store.commit('changeCurrentCategory', '所有')
  router.push(url)
  store.commit('changeShowMobileDrawer', false)
}
const showDrawer = (e) => {
  store.commit('changeShowMobileDrawer', true)
  e.stopPropagation()
}
</script>

<template>
  <nav class="nav" style="z-index: 10">
    <div class="title">勾勾的小站</div>
    <div class="nav-item-list">
      <div class="nav-item-pc">
        <div
          class="nav-item"
          @click="to(item.url)"
          v-for="item in list"
          :key="item.label"
        >
          <el-icon v-if="item.icon === 'search'"><search /></el-icon>
          <el-icon v-else-if="item.icon === 'house'"><house /></el-icon>
          <el-icon v-else-if="item.icon === 'folder'"><folder /></el-icon>
          <el-icon v-else-if="item.icon === 'mug'"><mug /></el-icon>
          <el-icon v-else><user /></el-icon>
          <span>{{ item.label }}</span>
        </div>
      </div>
      <div class="nav-item-mobile">
        <div class="nav-item">
          <el-icon size="30px" @click="showDrawer"><fold /></el-icon>
          <el-drawer
            :model-value="table"
            @update:model-value="$store.commit('changeShowMobileDrawer', false)"
            size="50%"
          >
            <el-menu class="el-menu-vertical-demo">
              <el-menu-item
                :index="index + ''"
                @click="to(item.url)"
                v-for="(item, index) in list"
                :key="item.label"
              >
                <el-icon v-if="item.icon === 'search'"><search /></el-icon>
                <el-icon v-else-if="item.icon === 'house'"><house /></el-icon>
                <el-icon v-else-if="item.icon === 'folder'"><folder /></el-icon>
                <el-icon v-else-if="item.icon === 'mug'"><mug /></el-icon>
                <el-icon v-else><user /></el-icon>
                <span>{{ item.label }}</span>
              </el-menu-item>
            </el-menu>
          </el-drawer>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>
@media screen and (max-width: 600px) {
  .nav-item-pc {
    display: none;
  }
}
@media screen and (min-width: 601px) {
  .nav-item-mobile {
    display: none;
  }
  .nav-item-pc {
    display: flex;
  }
  .nav-item {
    &:hover {
      color: white !important;
    }
  }
}
.nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  .show {
    transform: translateX(-100%);
  }
  .drawer {
    width: 50vw;
    height: 100vh;
    position: absolute;
    left: 62px;
    top: -16px;
    background: url('../../../assets/bg/aboutBg.png');
    background-color: white;
    transition: all 0.5s;
  }
  .title {
    padding-left: 1rem;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(255, 255, 255, 0.5);
    font-weight: bold;
    transition: all 0.5s;
  }
  .nav-item-list {
    padding-right: 1rem;
    display: flex;
    align-items: center;

    .nav-item {
      padding: 0 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 1.1rem;
      position: relative;
      color: silver;
      transition: color 0.4s ease;
      .el-menu {
        border: none;
      }
      span {
        margin-left: 0.25rem;
      }
    }
  }
}
</style>
