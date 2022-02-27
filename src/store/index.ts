import { createStore, useStore } from 'vuex'
import articleModule from './article/index'
import categoryModule from './category/index'
import { IStoreType, IRootType } from './types'

const store = createStore<IRootType>({
  state() {
    return {
      currentCategory: '所有',
      showMobileDrawer: false
    }
  },
  mutations: {
    changeCurrentCategory(state, payload) {
      state.currentCategory = payload
    },
    changeShowMobileDrawer(state, payload) {
      state.showMobileDrawer = payload
    }
  },
  actions: {},
  getters: {},
  modules: {
    article: articleModule,
    category: categoryModule
  }
})
function myUseStore() {
  return useStore<IStoreType>()
}
export { myUseStore as useStore }
export default store
