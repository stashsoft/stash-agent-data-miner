export interface Column {
  name: string
  description: string
}

export interface ResultFile {
  name: string
  status: ResultStatus
}

export enum ResultStatus {
  LOADING,
  SUCCESS,
  ERROR,
}
