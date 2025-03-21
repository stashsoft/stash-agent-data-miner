export interface Column {
  name: string
  description: string
}

export interface ResultLog {
  createdAt: string
  id: number
  message: string
}

export interface ResultFile {
  id: number
  name: string
  processed: number
}

export enum ResultStatus {
  STAND_BY = 1,
  LOADING = 2,
  PROCESSING = 4,
  SUCCESS = 8,
  ERROR = 16,
  ABORTING = 32,
}
