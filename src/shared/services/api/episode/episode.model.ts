export interface Episode {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface EpisodesDTO {
  info: PaginationInfo
  results: Episode[]
  error?: string
}

export interface EpisodeWithDimensionData extends Episode {
  uniqueDimensionCount: number
  dimensions: Record<string, string[]>
}
