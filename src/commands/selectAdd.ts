import { window } from 'vscode'
import BookmarkModel from '../BookmarkModel'
import * as fs from 'fs'

export default {
  identifier: 'selectAdd',
  async handler (args: Record<string, 'label'>) {
    const label = args && args.label
    if (label) {
      const result = await window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: true,
        canSelectMany: false,
      })
      if (result && result[0]) {
        const prefix = fs.statSync(result[0].path).isDirectory() ? 'folder:' : ''
        BookmarkModel.add(prefix + result[0].path, label)
      }
    }
  },
} as CommandModule
