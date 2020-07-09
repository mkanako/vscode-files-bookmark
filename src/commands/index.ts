import addFile from './addFile'
import deleteFile from './deleteFile'
import refresh from './refresh'
import newGroup from './newGroup'
import deleteGroup from './deleteGroup'
import renameGroup from './renameGroup'
import openFile from './openFile'

const commands: CommandModule[] = [
  addFile,
  deleteFile,
  refresh,
  newGroup,
  deleteGroup,
  renameGroup,
  openFile,
]

commands.forEach(command => {
  command.identifier = `files-bookmark.${command.identifier}`
})

export default commands
