import { window, Uri, commands } from 'vscode'

export default {
  identifier: 'openFile',
  async handler (args: string | Record<string, 'path'>) {
    try {
      const path = typeof args === 'string' ? args : args.path
      const uri = path.startsWith('vscode-userdata:') ? Uri.parse(path) : Uri.file(path)
      await commands.executeCommand('vscode.open', uri, {
        preview: typeof args === 'string',
      })
    } catch (error) {
      window.showErrorMessage(error.message)
    }
  },
} as CommandModule
