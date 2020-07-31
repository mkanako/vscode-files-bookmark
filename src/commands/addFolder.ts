import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'

export default {
  identifier: 'addFolder',
  async handler (args: Record<string, 'label'>) {
    const label = args && args.label
    if (label) {
      const result = await window.showOpenDialog({
        canSelectFiles: false,
        canSelectFolders: true,
        canSelectMany: false,
      })
      if (result && result[0]) {
        BookmarkModel.add(`folder:${result[0].path}`, label)
      }
    }
  },
} as CommandModule
