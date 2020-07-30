import { workspace, window, Uri } from 'vscode'

export default {
  identifier: 'openFile',
  async handler (args: string | Record<string, 'path'>) {
    try {
      const path = typeof args === 'string' ? args : args.path
      let document
      if (path.startsWith('vscode-userdata:')) {
        document = await workspace.openTextDocument(Uri.parse(path))
      } else {
        document = await workspace.openTextDocument(path)
      }
      if (document) {
        await window.showTextDocument(document, {
          preview: typeof args === 'string',
        })
      }
    } catch (error) {
      window.showErrorMessage(error.message)
    }
  },
} as CommandModule
