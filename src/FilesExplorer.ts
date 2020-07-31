import FilesTreeDataProvider from './FilesTreeDataProvider'

const commands: string[] = []

function asCommand (target: FilesExplorer, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  commands.push(name)
  return descriptor
}

class FilesExplorer {
  DataProvider: FilesTreeDataProvider
  commands: CommandModule[]

  constructor () {
    this.DataProvider = new FilesTreeDataProvider()
    this.commands = commands.map(name => ({
      identifier: name,
      handler: (this[name as keyof FilesExplorer] as CommandModule['handler']).bind(this),
    } as CommandModule))
  }

  @asCommand
  openFolder (path: string) {
    if (path) {
      this.DataProvider.setRoot(path)
    }
  }

  @asCommand
  refreshFolder () {
    this.DataProvider.refresh()
  }
}

export default new FilesExplorer()
