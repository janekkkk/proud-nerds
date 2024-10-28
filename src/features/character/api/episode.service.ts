import { Episode } from './episode.model'

/**
 * https://rickandmortyapi.com/documentation/#episode
 */
class EpisodeService {
  private baseURL = 'https://rickandmortyapi.com/api/episode'

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
