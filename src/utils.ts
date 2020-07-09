import { window } from 'vscode'

export function showMsg (msg: string): void {
  window.showInformationMessage(`Files Bookmark: ${msg}`)
}

export function showErr (msg: string): void {
  window.showErrorMessage(`Files Bookmark: ${msg}`)
}
