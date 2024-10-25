class CharacterService {
  private baseURL = 'https://rickandmortyapi.com/api/character'

  public async fetchCharacters(): Promise<Character[]> {
    return fetch(this.baseURL)
      .then((response) => {
        return response.json()
      })
      .then((dto: CharacterDTO) => dto.results)
  }
}

export const characterService = new CharacterService()
