export interface Dev {
  id?: number
  name: string
  skills: Obj
  project?: Obj
  otherSkills?: string
}

export interface Obj {
  [key: string]: any
}