/**
 * https://rickandmortyapi.com/documentation/#character
 */
class CharacterService {
  private readonly baseURL = 'https://rickandmortyapi.com/api/character'

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

  async fetchCharacterByURL(characterUrl: string): Promise<Character | null> {
    return fetch(characterUrl).then((response) => response.json())
  }
}

export const characterService = new CharacterService()
