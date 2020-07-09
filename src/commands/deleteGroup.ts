import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'deleteGroup',
  async handler ({ label: name }) {
    const group = BookmarkModel.getGroup(name)
    if (group) {
      if (group.length > 0) {
        const answer = await window.showWarningMessage(`Are you sure you want to delete '${name}' (${group.length}) ?`, { modal: true }, 'Yes', 'No')
        if (answer !== 'Yes') {
          return
        }
      }
      BookmarkModel.deleteGroup(name)
    }
  },
} as CommandModule
