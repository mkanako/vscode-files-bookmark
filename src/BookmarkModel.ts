import { Memento } from 'vscode'

export interface BookmarkData {
  [propName: string]: string[];
}

let instance: BookmarkModel

function autoSave (target: BookmarkModel, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const value = descriptor.value
  descriptor.value = function (this: BookmarkModel, ...args: unknown[]): boolean {
    const ret = value.apply(this, args)
    if (ret === true) {
      this.save()
    }
    return ret
  }
  return descriptor
}

export class BookmarkModel {
  private data: BookmarkData = {}
  private subscribers: (() => void)[] = []

  constructor (private storer: Memento) {
    this.loadData()
    if (!instance) {
      instance = this
    }
  }

  subscribe (fn: () => void): void {
    this.subscribers.push(fn)
  }

  loadData (): void {
    this.data = JSON.parse(this.storer.get('data', '{"default":[]}'))
  }

  get (): BookmarkData {
    return this.data
  }

  getGroup (name?: string): string[] {
    if (name) {
      return this.data[name] || []
    } else {
      return Object.keys(this.data)
    }
  }

  @autoSave
  add (path: string, groupName?: string): boolean {
    const group = groupName || Object.keys(this.data)[0]
    if (!group || !this.data[group] || this.data[group].includes(path)) {
      return false
    }
    this.data[group].push(path)
    return true
  }

  @autoSave
  delete (path: string, groupName?: string): boolean {
    const group = groupName || Object.keys(this.data)[0]
    if (!group || !this.data[group]) {
      return false
    }
    const index = this.data[group].findIndex(item => item === path)
    if (index < 0) {
      return false
    }
    this.data[group].splice(index, 1)
    return true
  }

  @autoSave
  addGroup (groupName: string): boolean {
    if (this.data[groupName]) {
      return false
    }
    this.data[groupName] = []
    return true
  }

  @autoSave
  renameGroup (groupName: string, newGroupName: string): boolean {
    // eslint-disable-next-line eqeqeq
    if (!this.data[groupName] || groupName == newGroupName || this.data[newGroupName]) {
      return false
    }
    delete Object.assign(this.data, { [newGroupName]: this.data[groupName] })[groupName]
    return true
  }

  @autoSave
  deleteGroup (groupName: string): boolean {
    if (!this.data[groupName]) {
      return false
    }
    delete this.data[groupName]
    return true
  }

  save (): void {
    this.storer.update('data', JSON.stringify(this.data))
    this.notify()
  }

  notify (): void {
    this.subscribers.forEach(fn => fn())
  }
}

export default new Proxy({}, {
  get (target, key) {
    if (!instance) {
      return undefined
    }
    return instance[key as keyof BookmarkModel]
  },
}) as BookmarkModel
