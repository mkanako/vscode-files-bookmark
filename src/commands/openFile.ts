import { workspace, window, commands } from 'vscode'

export default {
  identifier: 'openFile',
  async handler (args: string | Record<string, 'path'>) {
    try {
      const path = typeof args === 'string' ? args : args.path
      if (path.endsWith('Application Support/Code/User/settings.json')) {
        await commands.executeCommand('workbench.action.openSettingsJson')
        return
      }
      const document = await workspace.openTextDocument(path)
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
