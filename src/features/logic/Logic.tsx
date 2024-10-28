import { episodeService } from '../../shared/services/api/episode/episode.service'
import { useMount } from 'react-use'
import {
  Episode,
  EpisodeWithDimensionData
} from '../../shared/services/api/episode/episode.model'
import { characterService } from '../../shared/services/api/character/character.service'

interface Props {
  isLogging?: boolean
}

export const Logic = ({ isLogging = false }: Props) => {
  const mapEpisodeToDimensions = async (
    episode: Episode
  ): Promise<EpisodeWithDimensionData> => {
    const dimensions: Record<string, string[]> = {}
    const characterPromises = episode.characters.map((characterUrl) =>
      characterService.fetchCharacterByURL(characterUrl)
    )

    const characters = await Promise.all(characterPromises)

    for (const character of characters) {
      if (character) {
        const currentDimension = character.origin.name

        if (!dimensions[currentDimension]) {
          dimensions[currentDimension] = []
        }

        dimensions[currentDimension].push(character.name)
      }
    }

    return {
      ...episode,
      uniqueDimensionCount: Object.keys(dimensions).length,
      dimensions
    }
  }

  const getTopEpisodesByUniqueDimensions = async (
    episodes: Episode[],
    topNumberOfEpisodes = 10
  ): Promise<EpisodeWithDimensionData[]> => {
    const episodeDataPromises = episodes.map((episode) =>
      mapEpisodeToDimensions(episode)
    )
    const episodeData = await Promise.all(episodeDataPromises)

    return (
      episodeData
        // Sort by unique dimension count in descending order.
        .sort((a, b) => b.uniqueDimensionCount - a.uniqueDimensionCount)
        // Only return the top number of episodes (10 by default).
        .slice(0, topNumberOfEpisodes)
    )
  }

  useMount(async () => {
    if (isLogging) {
      const episodes = await episodeService.fetchAllEpisodes()
      const topEpisodes = await getTopEpisodesByUniqueDimensions(episodes, 10)
      console.log({ topEpisodes })
    }
  })

  return <div></div>
}
