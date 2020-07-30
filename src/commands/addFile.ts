import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'addFile',
  async handler (args: undefined | Record<string, 'label'>) {
    const editor = window.activeTextEditor
    if (!editor || editor.document.isUntitled) {
      return
    }
    const { scheme, fsPath, external } = editor.document.uri.toJSON()
    if (['file', 'vscode-userdata'].includes(scheme)) {
      const path = (scheme === 'vscode-userdata' && external) ? external : fsPath
      const label = args && args.label
      if (label) {
        BookmarkModel.add(path, label)
      } else {
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
    }
  },
} as CommandModule
