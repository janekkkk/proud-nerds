import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'react-use'

interface Props {
  debounceCallback: (inputValue: string) => void
  defaultValue?: string
  debounceTime?: number
  className?: string
}

export const Search = ({
  debounceCallback,
  defaultValue = '',
  debounceTime: debounceTimeInMs = 1000,
  className
}: Props) => {
  const [inputValue, setInputValue] = useState(defaultValue)
  const inputRef = useRef<HTMLInputElement>()

  const [,] = useDebounce(
    () => {
      debounceCallback(inputValue)
    },
    debounceTimeInMs,
    [inputValue]
  )

  const keyDownHandler = (event: KeyboardEvent) => {
    if (
      (event.ctrlKey && event.key === 'k') ||
      (event.metaKey && event.key === 'k')
    ) {
      inputRef?.current?.focus()
    }
  }

  useEffect(() => {
    // ToDo handle type issue
    window.addEventListener('keydown', keyDownHandler)
  })

  return (
    <div className={className}>
      <label
        htmlFor="search"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Quick search characters
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          id="search"
          name="search"
          type="text"
          value={inputValue}
          placeholder="Enter character name to search..."
          onChange={({ currentTarget }) => {
            setInputValue(currentTarget.value)
          }}
          autoFocus
          ref={inputRef}
          className="block w-full rounded-md border-0 px-2 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  )
}
