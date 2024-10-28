import { CharacterDetailDialog } from './CharacterDetailDialog'
import { useState } from 'react'
import { classNames } from '../../utils'

interface Props {
  characters: Character[]
  className?: string
}

export const CharacterOverview = ({ characters, className }: Props) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>()

  if (characters.length > 0) {
    return (
      <div className={classNames(className, 'overflow-auto')}>
        <ul>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {characters.map((character) => {
              return (
                <li
                  key={character.id}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                >
                  <div className="shrink-0">
                    <img
                      alt=""
                      src={character.image}
                      className="size-10 rounded-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => setSelectedCharacter(character)}
                      className="focus:outline-none"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      <p className="text-sm font-medium text-gray-900">
                        {character.name}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {character.status}
                      </p>
                    </button>
                  </div>
                </li>
              )
            })}
          </div>
        </ul>
        <CharacterDetailDialog character={selectedCharacter} />
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}
