import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'deleteItem',
  handler ({ path, group }) {
    BookmarkModel.delete(path, group)
  },
} as CommandModule
