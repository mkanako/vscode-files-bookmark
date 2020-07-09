import { workspace, window } from 'vscode'

export default {
  identifier: 'openFile',
  async handler (path) {
    const document = await workspace.openTextDocument(path)
    if (document) {
      await window.showTextDocument(document)
    }
  },
} as CommandModule
