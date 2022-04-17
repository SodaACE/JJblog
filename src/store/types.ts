import { IArticleState } from '@/store/article/types'
import { ICategoryState } from '@/store/category/types'

export interface IRootState {
  currentCategory: string
  showMobileDrawer: boolean
  isLoading: boolean
}

interface IRootWithModule {
  article: IArticleState
  category: ICategoryState
}
export type IStoreType = IRootState & IRootWithModule
