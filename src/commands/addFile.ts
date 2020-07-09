import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'addFile',
  async handler () {
    const editor = window.activeTextEditor
    if (editor && !editor.document.isUntitled && editor.document.uri.scheme === 'file') {
      const path = editor.document.uri.fsPath
      const groups = BookmarkModel.getGroup()
      if (groups.length > 1) {
        const selected = await window.showQuickPick(
          groups,
          { placeHolder: 'select a group ...' },
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
