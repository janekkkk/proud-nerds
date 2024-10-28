import { Episode } from './episode.model'

/**
 * https://rickandmortyapi.com/documentation/#character
 */
class CharacterService {
  private baseURL = 'https://rickandmortyapi.com/api/character'

  public async fetchByName(name: string): Promise<CharacterDTO> {
    return fetch(
      this.baseURL +
        '?' +
        new URLSearchParams({
          name
        }).toString()
    ).then((response) => {
      return response.json()
    })
  }
}

export const characterService = new CharacterService()
