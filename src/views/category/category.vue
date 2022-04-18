<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import myInfoCard from '@/components/infoCard'
import websiteInfoCard from '@/components/websiteInfoCard'
const store = useStore()
//获取标签列表
const categoryList = computed(() => store.state.category.categoryList)
//FIXME: 解决store刷新没数据的问题
</script>

<template>
  <div class="showCategory">
    <div class="bg">分类</div>
    <div class="content-block">
      <div class="content">
        <div class="title">
          <h2>所有分类</h2>
        </div>
        <div class="menu">
          <el-menu class="el-menu-vertical-demo">
            <el-sub-menu
              :index="index + ''"
              v-for="(item, index) in categoryList"
              :key="item._id"
            >
              <template #title>
                <el-icon><folder-opened /></el-icon>
                <span>{{ item.categoryName }}</span>
              </template>
              <el-menu-item
                v-for="(article, subIndex) in item.list"
                :index="`${index}-${subIndex}`"
                :key="article._id"
                @click="$router.push(`/article/${article._id}`)"
              >
                <el-icon><notebook /></el-icon>
                <span>{{ article.title }}.md</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </div>
      </div>
      <div class="card-list">
        <my-info-card></my-info-card>
        <website-info-card
          style="margin-top: 1rem"
        ></website-info-card>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
// 小屏幕
@media screen and (max-width: 600px) {
  .content-block {
    flex-direction: column-reverse;
    align-items: center;
    .content,
    .card-list {
      width: 97vw;
      margin: 1rem 0;
    }
  }
}
// 中屏幕
@media screen and (max-width: 1150px) and (min-width: 601px) {
  .content-block {
    flex-direction: column-reverse;
    align-items: center;
    .content,
    .card-list {
      width: 80vw;
      margin: 1rem 0;
    }
    .card-list {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
// 大屏幕
@media screen and (min-width: 1151px) {
  .content-block {
    justify-content: center;
    .content {
      width: 800px;
    }
    .card-list {
      width: 300px;
      margin-left: 20px;
    }
  }
}

.showCategory {
  width: 100%;
  display: flex;
  flex-direction: column;
  .bg {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: white;
    width: 100%;
    height: 25rem;
    background: var(--category-bg);
    background-position: top;
  }
  .content-block {
    width: 100%;
    display: flex;

    margin: 2rem 0;
    position: relative;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 82px;
      position: absolute;
      top: -114px;
      z-index: 1;
      background-image: var(--wave);
      background-repeat: repeat-x;
    }
    .content {
      background-color: white;
      border-radius: 0.4rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      .title {
        margin: 0 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      }
      .menu {
        padding: 20px;
        .el-menu {
          border: none;
        }
      }
    }
  }
}
</style>
