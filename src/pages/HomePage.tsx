import { CharacterOverview } from '../features/character/overview/CharacterOverview'
import { useEffect, useState } from 'react'
import { characterService } from '../features/character/api/character.service'

export const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    characterService.fetchCharacters().then((data) => {
      setCharacters(data)
    })
  }, [])

  return (
    <div className="relative  overflow-hidden bg-white">
      <div className="m-20 h-screen">
        <CharacterOverview characters={characters} />
      </div>
    </div>
  )
}
