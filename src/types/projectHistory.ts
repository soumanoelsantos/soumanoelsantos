
export interface ProjectVersion {
  id: string;
  version: number;
  code: string;
  message: string;
  timestamp: Date;
  userMessage?: string;
}

export interface ProjectHistoryContextType {
  versions: ProjectVersion[];
  currentVersion: number;
  addVersion: (code: string, message: string, userMessage?: string) => void;
  revertToVersion: (version: number) => void;
  getVersionByNumber: (version: number) => ProjectVersion | undefined;
}
