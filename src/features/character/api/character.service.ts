class CharacterService {
  private baseURL = 'https://rickandmortyapi.com/api/character'

  public async fetchCharacters(): Promise<Character[]> {
    return fetch(this.baseURL)
      .then((response) => {
        return response.json()
      })
      .then((dto: CharacterDTO) => dto.results)
  }

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
