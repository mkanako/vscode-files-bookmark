import * as vscode from 'vscode'
import BookmarkDataProvider from './BookmarkDataProvider'
import commands from './commands'
import BookmarkModel from './BookmarkModel'
import FilesExplorer from './FilesExplorer'

export function activate (context: vscode.ExtensionContext): void {
  BookmarkModel.registStorer(context.globalState)
  commands.forEach(command => {
    context.subscriptions.push(vscode.commands.registerCommand(command.identifier, command.handler))
  })
  context.subscriptions.push(vscode.window.registerTreeDataProvider('FilesBookmarkExplorer', new BookmarkDataProvider()))
  context.subscriptions.push(vscode.window.registerTreeDataProvider('FilesExplorer', FilesExplorer.DataProvider))
}

export function deactivate (): void { }
