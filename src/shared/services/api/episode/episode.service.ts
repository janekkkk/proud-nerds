import { Episode, EpisodesDTO } from './episode.model'

/**
 * https://rickandmortyapi.com/documentation/#episode
 */
class EpisodeService {
  private readonly baseURL = 'https://rickandmortyapi.com/api/episode'

  public async fetchAllEpisodes(): Promise<Episode[]> {
    const episodes: Episode[] = []
    let nextUrl: string | null = this.baseURL

    while (nextUrl) {
      // ToDo this can be more performant if I fetch pages instead of separate episodes using pagination.
      const episodesDTO = await this.fetchEpisodes(nextUrl)

      if (episodesDTO) {
        episodes.push(...episodesDTO.results)
        nextUrl = episodesDTO.info.next
      } else {
        nextUrl = null
      }
    }

    return episodes
  }

  private async fetchEpisodes(url: string): Promise<EpisodesDTO> {
    return fetch(url).then((response) => response.json())
  }

  public async fetchEpisodesFromURLs(
    episodeURLs: string[]
  ): Promise<Episode[]> {
    const numbers = this.getNumbersFromStrings(episodeURLs)
    const commaSeperatedNumbersString = this.getCommaSeperatedString(numbers)

    return fetch(`${this.baseURL}/${commaSeperatedNumbersString}`)
      .then((response) => response.json())
      .then((response: Episode | Episode[]) => {
        // Make episode response consistently array.
        return !Array.isArray(response) ? [response] : response
      })
  }

  private getNumbersFromStrings(list: string[]): number[] {
    return list.map((item) => Number(item.replace(/[^0-9]/g, '')))
  }

  private getCommaSeperatedString(list: number[]): string {
    return list.map(String).join(',')
  }
}

export const episodeService = new EpisodeService()
