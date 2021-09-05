export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodoAppendState {
  status: 'idle' | 'loading' | 'failed'
  error: string | null
}