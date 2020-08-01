import addFile from './addFile'
import deleteItem from './deleteItem'
import refresh from './refresh'
import newGroup from './newGroup'
import deleteGroup from './deleteGroup'
import renameGroup from './renameGroup'
import openFile from './openFile'
import selectAdd from './selectAdd'
import FilesExplorer from '../FilesExplorer'

const commands: CommandModule[] = [
  addFile,
  deleteItem,
  refresh,
  newGroup,
  deleteGroup,
  renameGroup,
  openFile,
  selectAdd,
  ...FilesExplorer.commands,
]

commands.forEach(command => {
  command.identifier = `files-bookmark.${command.identifier}`
})

export default commands
