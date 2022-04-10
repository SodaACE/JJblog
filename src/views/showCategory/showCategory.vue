<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import myInfoCard from '@/components/infoCard'
import websiteInfoCard from '@/components/websiteInfoCard'
const store = useStore()
//获取标签列表
const categoryList = computed(() => store.state.category.categoryList)
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
            <el-sub-menu :index="index + ''" v-for="(item, index) in categoryList" :key="item._id">
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
        <website-info-card style="margin-top: 1rem"></website-info-card>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media screen and (max-width: 600px) {
  .content-block {
    flex-direction: column-reverse;
    align-items: center;
  }
  .content {
    width: 97vw;
    margin: 1rem 0;
  }
  .category-list {
    width: 97vw;
  }
}
@media screen and (max-width: 1150px) and (min-width: 601px) {
  .content-block {
    flex-direction: column-reverse;
    align-items: center;
  }
  .content {
    width: 80vw;
    margin: 1rem 0;
  }
  .category-list {
    width: 80vw;
  }
  .card-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media screen and (min-width: 1151px) {
  .content {
    width: 800px;
  }
  .card-list {
    margin-left: 20px;
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
    height: 45vh;
    background: url('https://img.jzsp66.xyz/bg2.3f4c05a6.webp');
    background-position: top;
  }
  .content-block {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    position: relative;
    @keyframes wave {
      from {
        background-position: 0 bottom;
      }
      to {
        background-position: 1000% bottom;
      }
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 82px;
      position: absolute;
      top: -114px;
      z-index: 1;
      background-image: url('https://img.jzsp66.xyz/wave.4abb6f82.png');
      background-repeat: repeat-x;
      animation: wave 60s linear alternate infinite;
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
