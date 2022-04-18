<script lang="ts" setup>
import foldMenu from '@/components/foldMenu'
import markdown from '@/components/markdown'
import comments from '@/components/commentsCard'
import {
  useGetInfoAboutArticle,
  useGetTimeAndLength,
  useShowImg
} from './'
import { formatUtcString } from '@/utils/data-formate'
//获取文章的信息，例如path（categoryName和title）以及article信息，menu目录
const { path, article, menu } = useGetInfoAboutArticle()
//获取文章的字数和时间
const { time, length, loaded } = useGetTimeAndLength()
//控制是否要显示预览图片
const { url, isShowImg, showImg } = useShowImg()
</script>
<template>
  <div class="show-article">
    <div
      class="showImg"
      @click="isShowImg = false"
      :style="{ left: isShowImg ? '0' : '100%' }"
    >
      <img :src="url" style="height: 90%" />
    </div>
    <div class="bg">
      <div class="title">{{ article.title }}</div>
      <div class="line">
        <div>
          <el-icon><calendar /></el-icon>
          <span class="font">
            发表于：{{ formatUtcString(article.createTime) }}
          </span>
        </div>
        <div>
          <el-icon><folder-opened /></el-icon>
          <span class="font">属于：{{ article.categoryName }}</span>
        </div>
      </div>
      <div class="line">
        <div>
          <el-icon><document /></el-icon>
          <span class="font">字数总计：{{ length }}</span>
        </div>
        <div>
          <el-icon><timer /></el-icon>
          <span class="font">阅读时长：{{ time }}分钟</span>
        </div>
        <div>
          <img
            src="@/assets/icon/see.png"
            alt=""
            style="height: 17px; width: 17px"
          />
          <span class="font">访问量：{{ article.count }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="main-content">
        <div class="md">
          <markdown
            @titleMenu="(data) => (menu = data)"
            @showImg="showImg"
            @loaded="loaded"
            v-bind="path"
          ></markdown>
        </div>
        <div class="comments">
          <comments></comments>
        </div>
      </div>
      <div class="fold-menu">
        <fold-menu :menu="menu"></fold-menu>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media only screen and (max-width: 1150px) {
  .main-content {
    width: 95vw;
  }
  .font {
    font-size: 13px;
  }
  .title {
    font-size: 20px;
  }
  .line {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0;
    margin-left: 15px;
    .font {
      margin-left: 5px;
    }
  }
  .fold-menu {
    display: none;
  }
}

@media only screen and (min-width: 1151px) {
  .main-content {
    width: 800px;
  }
  .title {
    font-size: 40px;
  }
  .line {
    div:not(:last-of-type) {
      border-right: 2px solid white;
    }
  }
}
.show-article {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .showImg {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 100%;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 11;
    transition: all 0.5s;
    overflow: scroll;
  }
  .bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;
    height: 25rem;
    background: var(--article-bg);
    background-position: top;

    .title {
      margin-bottom: 15px;
    }

    .line {
      font-size: 17px;
      line-height: 1.3;
      display: flex;

      div {
        padding: 0 8px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        font {
          font-weight: 500;
        }
      }
    }
  }
  .content {
    position: relative;
    display: flex;
    justify-content: center;
    .md {
      padding: 20px;
      margin-top: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .fold-menu {
      position: sticky;
      top: 10px;
      align-self: flex-start;
      padding: 10px;
      margin-top: 5px;
      margin-left: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
    }
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 82px;
      position: absolute;
      top: -80px;
      z-index: 1;
      background-image: var(--wave);
      background-repeat: repeat-x;
    }
  }
}
</style>
