interface CommandModule {
  identifier: string;
  handler: (...args: any[]) => void;// eslint-disable-line @typescript-eslint/no-explicit-any
}

interface BookmarkData {
  [propName: string]: string[];
}
