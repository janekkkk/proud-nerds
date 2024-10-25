import { CharacterOverview } from '../features/character/overview/CharacterOverview'
import { useState } from 'react'
import { characterService } from '../features/character/api/character.service'
import { Pagination } from '../shared/components/pagination/pagination'
import { Search } from '../features/character/overview/Search'

export const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>()

  const onPaginationUpdated = async (followUpUrl: string) => {
    const data = await fetch(followUpUrl).then((response) => response.json())
    setCharacters(data.results)
    setPaginationInfo({ ...data.info, numberOfResults: data.results.length })
  }

  const fetchByName = (name: string) => {
    characterService.fetchByName(name).then((data) => {
      console.log({ data })

      if (!data.error) {
        setCharacters(data.results)
        setPaginationInfo({
          ...data.info,
          numberOfResults: data.results.length
        })
      } else {
        // ToDo handle error. Show to the user that there is nothing found.
      }
    })
  }

  const afterDebounce = (inputValue: string) => {
    fetchByName(inputValue)
  }

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="m-20 h-screen">
        <div className="flex flex-col gap-6">
          <Search debounceCallback={afterDebounce} />
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
