import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'renameGroup',
  async handler ({ label: name }) {
    const newName = await window.showInputBox({
      placeHolder: 'Enter a new group name ...',
      prompt: `rename "${name}"`,
    })
    if (newName) {
      BookmarkModel.renameGroup(name, newName)
    }
  },
} as CommandModule
