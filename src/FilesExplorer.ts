import FilesTreeDataProvider from './FilesTreeDataProvider'
import { TreeView, window } from 'vscode'

const commands: string[] = []

function asCommand (target: FilesExplorer, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  commands.push(name)
  return descriptor
}

class FilesExplorer {
  DataProvider: FilesTreeDataProvider
  commands: CommandModule[]
  treeview: TreeView<unknown>

  constructor () {
    this.DataProvider = new FilesTreeDataProvider()
    this.treeview = window.createTreeView('FilesExplorer', { treeDataProvider: this.DataProvider })
    this.commands = commands.map(name => ({
      identifier: name,
      handler: (this[name as keyof FilesExplorer] as CommandModule['handler']).bind(this),
    } as CommandModule))
  }

  @asCommand
  openFolder (path: string, name: string) {
    if (path) {
      this.DataProvider.setRoot(path)
      if (name) {
        this.treeview.title = name
      }
    }
  }

  @asCommand
  refreshFolder () {
    this.DataProvider.refresh()
  }
}

export default new FilesExplorer()
