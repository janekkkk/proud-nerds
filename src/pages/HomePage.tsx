import { CharacterOverview } from '../features/character/overview/CharacterOverview'
import { useEffect, useState } from 'react'
import { characterService } from '../features/character/api/character.service'
import { Pagination } from '../shared/components/pagination/pagination'

export const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>()

  const onPaginationUpdated = async (followUpUrl: string) => {
    const data = await fetch(followUpUrl).then((response) => response.json())
    setCharacters(data.results)
    setPaginationInfo({ ...data.info, numberOfResults: data.results.length })
  }

  useEffect(() => {
    characterService.fetchByName('rick').then((data) => {
      setCharacters(data.results)
      setPaginationInfo({ ...data.info, numberOfResults: data.results.length })
      console.log({ data })
    })
  }, [])

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="m-20 h-screen">
        <div className="flex flex-col gap-6">
          <CharacterOverview characters={characters} />
          <Pagination
            paginationInfo={paginationInfo}
            paginationUpdated={onPaginationUpdated}
          />
        </div>
      </div>
    </div>
  )
}
