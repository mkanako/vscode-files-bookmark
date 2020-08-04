import { FilesTreeDataProvider } from './FilesTreeDataProvider'
import { TreeView } from 'vscode'
import { Explorer } from './Explorer'

export class FilesExplorer extends Explorer {
  constructor (private treeView: TreeView<unknown>, private dataProvider: FilesTreeDataProvider) {
    super()
  }

  openFolder (path: string, name: string): void {
    if (path) {
      this.dataProvider.setRoot(path)
      if (name) {
        this.treeView.title = name
      }
    }
  }

  refreshFolder (): void {
    this.dataProvider.refresh()
  }
}
