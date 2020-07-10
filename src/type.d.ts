interface CommandModule {
  identifier: string;
  handler: (...args: unknown[]) => void;
}

interface BookmarkData {
  [propName: string]: string[];
}
