import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'addFile',
  async handler () {
    const editor = window.activeTextEditor
    if (!editor || editor.document.isUntitled) {
      return
    }
    const { scheme, fsPath: path } = editor.document.uri
    if (scheme === 'file' || scheme === 'vscode-userdata') {
      const groups = BookmarkModel.getGroup()
      if (groups.length > 1) {
        const selected = await window.showQuickPick(
          groups,
          { placeHolder: 'Select a group ...' },
        )
        if (selected) {
          BookmarkModel.add(path, selected)
        }
      } else {
        BookmarkModel.add(path)
      }
    }
  },
} as CommandModule
