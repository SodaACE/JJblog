<script lang="ts" setup>
import myArticle from '../../components/articleCard'
import myInfoCard from '../../components/infoCard/src/InfoCard.vue'
import classifyCard from '@/components/classifyCard'
import websiteInfoCard from '@/components/websiteInfoCard'
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()

const arr = 'Welcome to my website, I will be here to share my study notes'
const show = ref(arr)

let count = 0
let flag = 1
setInterval(() => {
  //如果不断减小到复数，就变成增加，如果不断增大超过length，就变成减小
  if (count <= 0) flag = 1
  if (count > arr.length) flag = -1
  count += flag
  show.value = arr.slice(0, count)
}, 200)

const articleList = computed(() => store.state.article.articleList)
const categoryList = computed(() => store.state.category.categoryList)

const categoryClick = (item) => {
  store.commit('article/changeArticleList', item.list)
}
const to = (id) => {
  router.push(`/article/${id}`)
}

const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="main">
    <div class="bg">
      <div class="title">欢迎来到勾勾的小站</div>
      <div class="sentence">{{ show }} |</div>
      <!--      <a href="#content"></a>-->
      <div class="arrow" @click="scrollToContent"></div>
    </div>
    <div class="content" id="content">
      <div class="article-list">
        <div class="bread-crumbs">
          <div class="bread-title">
            当前分类：{{ $store.state.currentCategory }}
          </div>
        </div>
        <transition-group name="wjj" appear>
          <my-article
            v-for="(item, index) in articleList"
            :key="item._id"
            @click="to(item._id)"
            :index="index"
            :item="item"
          />
        </transition-group>
      </div>
      <div class="card-list">
        <my-info-card />

        <classify-card
          class="hide-in-mobile"
          @categoryClick="categoryClick"
          :list="categoryList"
        />

        <website-info-card class="hide-in-mobile" />
      </div>
    </div>
    <div class="at-bottom">到底了哦~底了哦~了哦~哦~</div>
  </div>
</template>

<style lang="less" scoped>
@media only screen and (max-width: 1150px) {
  .title {
    font-size: 1.5rem;
  }
  .sentence {
    font-size: 1rem;
  }
  .at-bottom {
    font-size: 0.7rem;
  }
  .content {
    flex-direction: column-reverse;
    align-items: center;
  }
  .card-list {
    margin-left: 0;
  }
}
@media only screen and (max-width: 600px) {
  .bread-crumbs {
    width: 97vw;
    margin-bottom: 1rem;
  }
  .hide-in-mobile {
    display: none;
  }
}
@media only screen and (max-width: 1150px) and (min-width: 601px) {
  .bread-crumbs {
    width: 80vw;
    margin-bottom: 1rem;
  }
}
@media only screen and (min-width: 1151px) {
  .title {
    font-size: 2.5rem;
  }
  .sentence {
    font-size: 1.5rem;
  }
  .at-bottom {
    font-size: 1.2rem;
  }
  .content {
    flex-direction: row;
    justify-content: center;
  }
  .card-list {
    margin-left: 20px;
  }
  .bread-crumbs {
    width: 800px;
    margin: 1rem 0;
  }
}
.main {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  .bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('../../assets/bg/bg.png');
    background-size: cover;
    // 设置背景图位置
    background-position: center;
    position: relative;
    .title {
      color: white;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .sentence {
      padding: 0 20px;
      color: white;
      text-align: center;
      font-weight: 200;
    }

    @keyframes upAndDown {
      from {
        bottom: 30px;
        border-top: 0.3rem solid silver;
        border-right: 0.3rem solid silver;
      }
      to {
        bottom: 20px;
        border-top: 0.3rem solid white;
        border-right: 0.3rem solid white;
      }
    }
    .arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      cursor: pointer;
      transform: rotate(135deg);
      animation: upAndDown 1.5s linear alternate-reverse infinite;
    }
  }

  .content {
    width: 100%;
    display: flex;

    .article-list {
      .bread-crumbs {
        background-color: white;

        padding: 1rem 0;
        border-radius: 0.4rem;
        box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.5);
        .bread-title {
          margin-left: 1rem;
        }
      }
      .category-item {
        display: flex;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0.3rem;
        align-items: center;

        &:hover {
          color: rgba(0, 0, 0, 0.2);
        }

        .count {
          background-color: rgb(115, 201, 229);
          color: white;
          padding: 0 0.5rem;
          margin-left: 5px;
          font-size: 0.8rem;
          border-radius: 2px;
        }
      }
    }

    .card-list {
      margin-top: 1rem;
      div {
        margin-bottom: 1rem;
      }
    }
  }
}
.at-bottom {
  padding: 1rem 0;
  text-align: center;
  color: black;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.wjj-enter-from,
.wjj-leave-to {
  opacity: 0;
}

.wjj-leave-active {
  transition: all 0.5s;
}
.wjj-enter-active {
  transition: all 0.5s 0.5s;
}
</style>
