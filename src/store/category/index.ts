import { Module } from 'vuex'
import { ICategoryType } from './types'
import { getCategoryList } from '@/service/category'

const module: Module<ICategoryType, any> = {
  namespaced: true,
  state() {
    return {
      categoryList: [],
      allCount: 0
    }
  },
  actions: {
    async getDataList({ commit }, payload) {
      const res = await getCategoryList(payload)
      commit('changeCategoryList', res.data?.list)
      commit('changeAllcount', res.data?.allCount)
    }
  },
  mutations: {
    changeAllcount(state, data) {
      state.allCount = data
    },
    changeCategoryList(state, data) {
      state.categoryList = data
    }
  }
}
export default module
