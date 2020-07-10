import { workspace, window } from 'vscode'

export default {
  identifier: 'openFile',
  async handler (path: string) {
    try {
      const document = await workspace.openTextDocument(path)
      if (document) {
        await window.showTextDocument(document)
      }
    } catch (error) {
      window.showErrorMessage(error.message)
    }
  },
} as CommandModule
