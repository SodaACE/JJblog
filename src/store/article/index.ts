import { Module } from 'vuex'
import { IArticleType } from '@/store/article/types'
import { getArticleList } from '@/service/article'

const module: Module<IArticleType, any> = {
  namespaced: true,
  state() {
    return {
      articleList: [],
      allCount: 0
    }
  },
  actions: {
    async getDataList({ commit }, payload) {
      const res = await getArticleList(payload)
      commit('changeArticleList', res.data?.list)
      commit('changeAllcount', res.data?.allCount)
    }
  },
  mutations: {
    changeArticleList(state, data) {
      state.articleList = data
    },
    changeAllcount(state, data) {
      state.allCount = data
    }
  }
}
export default module
