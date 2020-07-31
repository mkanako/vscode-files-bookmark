import {
  TreeItem,
  EventEmitter,
  Event,
  Uri,
  TreeDataProvider,
  TreeItemCollapsibleState,
  ProviderResult,
  ThemeIcon,
} from 'vscode'
import { resolve } from 'path'
import * as fs from 'fs'

interface FileItem {
  path: string;
  name: string;
  isDir: boolean;
}

function readdir (path: string): FileItem[] {
  const ignoreList = ['.DS_Store', '.git']
  if (!path) return []
  return fs.readdirSync(path)
    .filter(file => !ignoreList.includes(file))
    .map(file => {
      const fsPath = resolve(path, file)
      const stats = fs.statSync(fsPath)
      return {
        path: fsPath,
        name: file,
        isDir: stats.isDirectory(),
      }
    })
    .sort((a, b) => {
      if (a.isDir === b.isDir) {
        return a.name.localeCompare(b.name)
      }
      return a.isDir ? -1 : 1
    })
}

class FilesTreeDataProvider implements TreeDataProvider<FileItem> {
  private _onDidChangeTreeData: EventEmitter<FileItem | undefined | void> = new EventEmitter()
  readonly onDidChangeTreeData: Event<FileItem | undefined | void> = this._onDidChangeTreeData.event
  private root: string

  constructor () {
    this.root = ''
  }

  setRoot (path:string):void {
    if (this.root !== path) {
      this.root = path
      this.refresh()
    }
  }

  refresh (): void {
    this._onDidChangeTreeData.fire()
  }

  getChildren (element?: FileItem): ProviderResult<FileItem[]> {
    if (element) {
      if (element.isDir) {
        return readdir(element.path)
      } else {
        return []
      }
    } else {
      return readdir(this.root)
    }
  }

  getTreeItem (element: FileItem): TreeItem {
    const treeItem = new TreeItem(element.name, element.isDir ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.None)
    treeItem.id = element.path
    if (element.isDir) {
      treeItem.iconPath = ThemeIcon.Folder
    } else {
      treeItem.command = {
        command: 'files-bookmark.openFile',
        title: 'Open File',
        arguments: [element.path],
      }
      treeItem.tooltip = `Open File "${element.path}"`
      treeItem.resourceUri = Uri.file(element.path)
      treeItem.contextValue = 'file'
    }
    return treeItem
  }
}

export default FilesTreeDataProvider
