<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import debounce from '@/utils/debounce'
import { getArticleListWithoutShowLoading } from '@/service/article'
const router = useRouter()
const route = useRoute()
const store = useStore()

//存储导航栏的内容信息
const list = ref([
  { label: '搜索', url: '/search', icon: 'search' },
  { label: '主页', url: '/main', icon: 'house' },
  { label: '分类', url: '/category', icon: 'folder' },
  { label: '留言板', url: '', icon: 'mug' },
  { label: '关于', url: '/about', icon: '' }
])
//搜索框绑定的内容
const input = ref()
//搜索到的文章列表
const articleList = ref([])
//是否显示输入框
const showInput = ref(false)
//防抖函数
const debounce_getArticle = debounce(getArticleListWithoutShowLoading)
//是否显示抽屉
const showMobileDrawer = ref(false)
//导航菜单点击
const navClick = (url: any) => {
  //点击导航栏的时候隐藏抽屉
  showMobileDrawer.value = false
  //如果点击的是搜索按钮
  if (url === '/search') {
    //是否显示的布尔值取反
    showInput.value = !showInput.value
    //如果是不显示，就清除搜索到的内容列表
    if (showInput.value === false) {
      articleList.value = []
      input.value = ''
    }
    return
  }
  //如果是点击的主页，就额外commit一下状态
  if (url === '/main') store.commit('changeCurrentCategory', '所有')
  router.push(url)
}

//监听input输入框的变化
watch(
  () => input.value,
  async () => {
    //如果变化且有值，就发送请求
    input.value
      ? debounce_getArticle({ title: input.value }).then((res: any) => {
          //找到了就修改list，否则就置空
          if (res.data.status) {
            articleList.value = res.data.data.list
          } else {
            articleList.value = []
          }
        })
      : (articleList.value = [])
  }
)

//监听路由的变化，路由变的时候隐藏输入框
watch(
  () => route.path,
  () => {
    showInput.value = false
    articleList.value = []
    input.value = ''
  }
)
</script>

<template>
  <nav class="nav" style="z-index: 10">
    <div class="title">勾勾的小站</div>
    <div class="nav-content">
      <!--电脑端显示的nav有搜索框-->
      <div class="nav-pc" style="position: relative">
        <transition name="wjj">
          <el-input v-if="showInput" v-model="input" placeholder="Please input" clearable />
        </transition>
        <el-menu class="el-menu-vertical-demo" :router="true">
          <el-menu-item v-for="item in articleList" :index="`/article/${item._id}`" :key="item._id">
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
        <div class="nav-item" @click="navClick(item.url)" v-for="item in list" :key="item.label">
          <el-icon v-if="item.icon === 'search'"><search /></el-icon>
          <el-icon v-else-if="item.icon === 'house'"><house /></el-icon>
          <el-icon v-else-if="item.icon === 'folder'"><folder /></el-icon>
          <el-icon v-else-if="item.icon === 'mug'"><mug /></el-icon>
          <el-icon v-else><user /></el-icon>
          <span>{{ item.label }}</span>
        </div>
      </div>
      <!--手机端显示的nav没有搜索框-->
      <div class="nav-mobile">
        <div class="nav-item">
          <el-icon size="30px" @click="showMobileDrawer = !showMobileDrawer"><fold /></el-icon>
          <el-drawer v-model="showMobileDrawer" size="50%">
            <el-menu class="el-menu-vertical-demo">
              <el-menu-item
                :index="index + ''"
                @click="navClick(item.url)"
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
  .nav-pc {
    display: none;
  }
}
@media screen and (min-width: 601px) {
  .nav-mobile {
    display: none;
  }
  .nav-pc {
    display: flex;
    align-items: center;
    position: relative;
    .el-menu {
      position: absolute;
      top: 100%;
      width: 200px;
      .el-menu-item {
        height: 30px;
      }
    }
    .el-input {
      width: 200px;
    }
  }
}
.nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;

  //设置抽屉的宽度
  ::v-deep .el-overlay {
    width: 100vw;
  }

  //设置标题样式
  .title {
    padding-left: 1rem;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    text-shadow: 0.1rem 0.1rem 0.2rem rgba(255, 255, 255, 0.5);
    font-weight: bold;
    transition: all 0.5s;
  }

  //导航容器样式
  .nav-content {
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

      //鼠标移入样式
      &:hover {
        color: white !important;
      }

      //取消menu的右边框
      .el-menu {
        border: none;
      }

      //设置每个item的间距
      span {
        margin-left: 0.25rem;
        white-space: nowrap;
      }
    }
  }
}

//设置transition的样式
.wjj-enter-from,
.wjj-leave-to {
  opacity: 0;
}
.wjj-enter-active,
.wjj-leave-active {
  transition: all 0.5s;
}
</style>
