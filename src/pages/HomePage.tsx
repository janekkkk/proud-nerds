import { CharacterOverview } from '../features/character/CharacterOverview'
import React, { useState } from 'react'
import { characterService } from '../shared/services/api/character/character.service'
import { Pagination } from '../shared/components/pagination/pagination'
import { Search } from '../features/character/Search'
import { Logic } from '../features/logic/Logic'

export const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>()

  const refreshCharactersWithPagination = (data: CharacterDTO) => {
    setCharacters(data.results)
    setPaginationInfo({ ...data.info, numberOfResults: data.results.length })
  }

  const onPaginationUpdated = async (followUpURL: string) => {
    const data = await fetch(followUpURL).then((response) => response.json())
    refreshCharactersWithPagination(data)
  }

  const fetchByName = (name: string) => {
    characterService.fetchByName(name).then((data) => {
      if (!data.error) {
        refreshCharactersWithPagination(data)
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
          <Logic isLogging={true} />
        </div>
      </div>
    </div>
  )
}
