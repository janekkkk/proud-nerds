import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import { useToggle } from 'react-use'
import { Episode } from '../../shared/services/api/episode/episode.model'
import { classNames } from '../../utils'
import { episodeService } from '../../shared/services/api/episode/episode.service'

interface Props {
  character?: Character
}

export const CharacterDetailDialog = ({ character }: Props) => {
  const [open, toggleOpen] = useToggle(!!character)
  const [episodes, setEpisodes] = useState<Episode[]>([])

  const fetchEpisodes = async () => {
    if (character?.episode) {
      setEpisodes(
        await episodeService.fetchEpisodesFromURLs(character?.episode)
      )
    }
  }

  useEffect(() => {
    if (!open && character) {
      toggleOpen()
      fetchEpisodes()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character, toggleOpen])

  return (
    <Dialog open={open} onClose={toggleOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className=" sm:flex sm:items-start">
                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {character?.name}
                  </DialogTitle>
                  <div className="mt-2">
                    <ul className="max-h-80 overflow-auto text-sm text-gray-500">
                      <li className="flex content-center justify-center">
                        <img
                          src={character?.image}
                          alt=""
                          className="mx-auto size-32 shrink-0 rounded-full"
                        />
                      </li>
                      <li>Name: {character?.name}</li>
                      <li>Type: {character?.type}</li>
                      <li>Gender: {character?.gender}</li>
                      <li>Species {character?.species}</li>
                      <li>Status: {character?.status}</li>
                      <li
                        className={classNames({
                          hidden: episodes.length === 0
                        })}
                      >
                        Episode(s):
                        {episodes.map((episode) => {
                          return (
                            <ul key={episode.id} className="flex gap-2">
                              <li>{episode.episode}</li>
                              <li>{episode.name}</li>
                            </ul>
                          )
                        })}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={toggleOpen}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
