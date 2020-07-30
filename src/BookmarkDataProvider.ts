import {
  TreeItem,
  EventEmitter,
  Event,
  Uri,
  TreeDataProvider,
  TreeItemCollapsibleState,
  ProviderResult,
} from 'vscode'
import { basename } from 'path'
import BookmarkModel from './BookmarkModel'

class BookmarkGroup extends TreeItem {
  constructor (label: string) {
    super(label, TreeItemCollapsibleState.Expanded)
    this.contextValue = 'parent'
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
    this.command = {
      command: 'files-bookmark.openFile',
      title: 'Open File',
      arguments: [path],
    }
    this.tooltip = `open file "${path}"`
    this.resourceUri = Uri.file(path)
    this.contextValue = 'child'
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
