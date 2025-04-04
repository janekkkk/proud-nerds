interface CharacterDTO {
  info: PaginationInfo
  results: Character[]
  error?: string
}

interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: Origin
  location: Origin
  image: string
  episode: string[]
  url: string
  created: string
}

interface PaginationInfo {
  count: number
  pages: number
  next: string
  prev?: string
  numberOfResults: number
}
