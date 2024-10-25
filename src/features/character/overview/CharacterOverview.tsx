interface Props {
  characters: Character[]
}

export const CharacterOverview = ({ characters }: Props) => {
  if (characters.length > 0) {
    return (
      <div>
        <ul>
          {characters.map((character) => {
            return <li key={character.id}>{character.name}</li>
          })}
        </ul>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}
