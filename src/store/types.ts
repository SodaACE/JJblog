import { IArticleState } from '@/store/article/types'
import { ICategoryState } from '@/store/category/types'
import { ICommentState } from './comment/types'

export interface IRootState {
  currentCategory: string
  showMobileDrawer: boolean
  isLoading: boolean
}

interface IRootWithModule {
  article: IArticleState
  category: ICategoryState
  comment: ICommentState
}
export type IStoreType = IRootState & IRootWithModule
