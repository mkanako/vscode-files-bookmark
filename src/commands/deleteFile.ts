import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'deleteFile',
  handler ({ path, group }) {
    BookmarkModel.delete(path, group)
  },
} as CommandModule
