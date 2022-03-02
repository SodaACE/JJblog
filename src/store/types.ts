import { IArticleType } from '@/store/article/types'
import { ICategoryType } from '@/store/category/types'

export interface IRootType {
  currentCategory: string
  showMobileDrawer: boolean
  isLoading: boolean
}

interface IRootWithModule {
  article: IArticleType
  category: ICategoryType
}
export type IStoreType = IRootType & IRootWithModule
