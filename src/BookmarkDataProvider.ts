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
import { basename } from 'path'
import BookmarkModel from './BookmarkModel'

class BookmarkGroup extends TreeItem {
  constructor (label: string) {
    super(label, TreeItemCollapsibleState.Expanded)
    this.contextValue = 'group'
  }
}

class BookmarkItem extends TreeItem {
  path: string
  group: string

  constructor (path: string, group: string) {
    super(basename(path))
    this.id = `${group}:${path}`
    this.path = path
    this.group = group
    if (path.startsWith('folder:')) {
      const realPath = path.replace(/^folder:/, '')
      this.command = {
        command: 'files-bookmark.openFolder',
        title: 'Open Folder',
        arguments: [realPath, this.label],
      }
      this.tooltip = `Open Folder "${realPath}"`
      this.iconPath = ThemeIcon.Folder
      this.contextValue = 'folder '
    } else {
      this.command = {
        command: 'files-bookmark.openFile',
        title: 'Open File',
        arguments: [path],
      }
      this.tooltip = `Open File "${path}"`
      this.resourceUri = Uri.file(path)
      this.contextValue = 'file'
    }
  }
}

export default class BookmarkDataProvider implements TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: EventEmitter<TreeItem | undefined | void> = new EventEmitter()
  readonly onDidChangeTreeData: Event<TreeItem | undefined | void> = this._onDidChangeTreeData.event
  private data: BookmarkData

  constructor () {
    this.data = BookmarkModel.get()
    BookmarkModel.subscribe(this.refresh.bind(this))
  }

  refresh (): void {
    this.data = BookmarkModel.get()
    this._onDidChangeTreeData.fire()
  }

  getChildren (element?: TreeItem): ProviderResult<TreeItem[]> {
    if (element) {
      if (element instanceof BookmarkGroup && element.label) {
        const groupName = element.label
        return this.data[groupName].map(path => new BookmarkItem(path, groupName))
      } else {
        return []
      }
    } else {
      return Object.keys(this.data).map(groupName => new BookmarkGroup(groupName))
    }
  }

  getTreeItem (element: TreeItem): TreeItem {
    return element
  }
}
