import * as vscode from 'vscode'
import { BookmarkDataProvider } from './BookmarkDataProvider'
import { BookmarkModel } from './BookmarkModel'
import { FilesTreeDataProvider } from './FilesTreeDataProvider'
import { FilesExplorer } from './FilesExplorer'
import { FilesBookmarkExplorer } from './FilesBookmarkExplorer'

export function activate (context: vscode.ExtensionContext): void {
  const bookmarkModel = new BookmarkModel(context.globalState)

  context.subscriptions.push(vscode.window.registerTreeDataProvider('FilesBookmarkExplorer', new BookmarkDataProvider(bookmarkModel)))

  const filesTreeDataProvider = new FilesTreeDataProvider()

  const fileTreeView = vscode.window.createTreeView('FilesExplorer', { treeDataProvider: filesTreeDataProvider })

  context.subscriptions.push(fileTreeView)

  const filesBookmarkExplorer = new FilesBookmarkExplorer()

  context.subscriptions.push(...filesBookmarkExplorer.registerCommand())

  const filesExplorer = new FilesExplorer(fileTreeView, filesTreeDataProvider)

  context.subscriptions.push(...filesExplorer.registerCommand())
}

export function deactivate (): void { }
