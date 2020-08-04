/* eslint-disable @typescript-eslint/no-var-requires */
import { ExtensionContext, commands as commander } from 'vscode'

const { contributes } = require('../package.json')

const commands: string[] = contributes.commands.map((item: { command: string }) => item.command)

export class Explorer {
  registerCommand (): ExtensionContext['subscriptions'] {
    const disposables: ExtensionContext['subscriptions'] = []
    for (let i = commands.length - 1; i >= 0; --i) {
      const item = commands[i].split('.')
      if (item.length === 2) {
        const handler = this[item[1] as keyof Explorer]
        if (handler && typeof handler === 'function') {
          disposables.push(commander.registerCommand(item.join('.'), handler.bind(this)))
          commands.splice(i, 1)
        }
      }
    }
    return disposables
  }
}
