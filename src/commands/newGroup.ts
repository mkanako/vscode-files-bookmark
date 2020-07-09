import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'newGroup',
  async handler () {
    const name = await window.showInputBox({
      placeHolder: 'enter a new group name ...',
    })
    if (name) {
      BookmarkModel.addGroup(name)
    }
  },
} as CommandModule
