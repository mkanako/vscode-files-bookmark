import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'refresh',
  handler () {
    BookmarkModel.loadData()
    BookmarkModel.notify()
  },
} as CommandModule
