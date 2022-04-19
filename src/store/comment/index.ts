import { Module } from 'vuex'
import { IRootState } from '../types'
import { getCommentList } from '@/service/comments'
import { ICommentState } from './types'
const module: Module<ICommentState, IRootState> = {
  namespaced: true,
  state() {
    return {
      commentList: [],
      allCount: 0
    }
  },
  actions: {
    async getDataList({ commit }, payload) {
      const res = await getCommentList(payload)
      commit('changeCommentList', res.data?.list)
      commit('changeAllcount', res.data?.allCount)
    }
  },
  mutations: {
    changeCommentList(state, data) {
      state.commentList = data
    },
    changeAllcount(state, data) {
      state.allCount = data
    }
  }
}
export default module
