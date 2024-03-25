export interface IAlltimeData {
  data: IAllTimeDataUser
}

export interface IAllTimeDataUser {
  total_seconds: number
  text: string
  decimal: string
  digital: string
  is_up_to_date: boolean
  percent_calculated: number
  range: IAllTimeRangeUser
  timeout: number
}

export interface IAllTimeRangeUser {
  start: string
  start_date: string
  start_text: string
  end: string
  end_date: string
  end_text: string
  timezone: string
}

export type AllHeartBeatData ={data:IHeartBeatData[]}

export interface IHeartBeatData {
  id: string
  entity: string
  type: string
  time: number
  project: string
  project_root_count?: number
  branch?: string
  language?: string
  dependencies: string[]
  line_additions: any
  line_deletions: any
  lines: number
  lineno: number
  cursorpos: number
  is_write: boolean
  category: string
  created_at: string
  user_id: string
  user_agent_id: string
  machine_name_id: string
}
