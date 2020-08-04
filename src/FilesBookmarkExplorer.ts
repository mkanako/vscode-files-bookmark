/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Explorer } from './Explorer'
import { window, commands, Uri } from 'vscode'
import BookmarkModel from './BookmarkModel'
import * as fs from 'fs'

interface commandArgs {
  label: string;
  path?: string;
  group?: string;
}

export class FilesBookmarkExplorer extends Explorer {
  async addFile (args: commandArgs) {
    const editor = window.activeTextEditor
    if (!editor || editor.document.isUntitled) {
      return
    }
    const { scheme, fsPath, external } = editor.document.uri.toJSON()
    if (['file', 'vscode-userdata'].includes(scheme)) {
      const path = (scheme === 'vscode-userdata' && external) ? external : fsPath
      const label = args && args.label
      if (label) {
        BookmarkModel.add(path, label)
      } else {
        const groups = BookmarkModel.getGroup()
        if (groups.length > 1) {
          const selected = await window.showQuickPick(
            groups,
            { placeHolder: 'Select a group ...' },
          )
          if (selected) {
            BookmarkModel.add(path, selected)
          }
        } else {
          BookmarkModel.add(path)
        }
      }
    }
  }

  async deleteGroup (args: commandArgs) {
    if (args && args.label) {
      const group = BookmarkModel.getGroup(args.label)
      if (group) {
        if (group.length > 0) {
          const answer = await window.showWarningMessage(`Are you sure to delete '${args.label}' ?`, { modal: true }, 'Yes', 'No')
          if (answer !== 'Yes') {
            return
          }
        }
        BookmarkModel.deleteGroup(args.label)
      }
    }
  }

  deleteItem ({ path, group }: commandArgs) {
    if (path && group) {
      BookmarkModel.delete(path, group)
    }
  }

  async newGroup () {
    const name = await window.showInputBox({
      placeHolder: 'Enter a new group name ...',
    })
    if (name) {
      BookmarkModel.addGroup(name)
    }
  }

  async openFile (args: string | commandArgs) {
    const path = typeof args === 'string' ? args : args.path
    if (path) {
      const uri = path.startsWith('vscode-userdata:') ? Uri.parse(path) : Uri.file(path)
      await commands.executeCommand('vscode.open', uri, {
        preview: typeof args === 'string',
      })
    }
  }

  refresh () {
    BookmarkModel.loadData()
    BookmarkModel.notify()
  }

  async renameGroup ({ label: name }: commandArgs) {
    const newName = await window.showInputBox({
      placeHolder: 'Enter a new group name ...',
      prompt: `rename "${name}"`,
    })
    if (newName) {
      BookmarkModel.renameGroup(name, newName)
    }
  }

  async selectAdd (args: commandArgs) {
    const label = args && args.label
    if (label) {
      const result = await window.showOpenDialog({
        canSelectFiles: true,
        canSelectFolders: true,
        canSelectMany: false,
      })
      if (result && result[0]) {
        const prefix = fs.statSync(result[0].path).isDirectory() ? 'folder:' : ''
        BookmarkModel.add(prefix + result[0].path, label)
      }
    }
  }
}
