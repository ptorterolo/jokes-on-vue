interface Flag {
  nsfw: boolean
  religious: boolean
  political: boolean
  racist: boolean
  sexist: boolean
  explicit: boolean
}
export interface Joke {
  category?: string
  type?: string
  joke?: string
  setup?: string
  delivery?: string
  flags?: Flag
  safe?: boolean
  id?: number
  lang?: string
}

export interface useAxiosComposable {
  data: Joke[] | Joke
  isLoading: boolean
  error: string | null
  getData: () => Promise<void>
}

export interface RequestParams {
  amount: number
  blacklistFlags?: string
  type?: string
}
