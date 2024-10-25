import { useState } from 'react'
import { Button } from '../button/Button'
import { useMount } from 'react-use'

interface Props {
  paginationInfo?: PaginationInfo
  paginationUpdated: (followUpUrl: string) => void
}

export const Pagination = ({ paginationInfo, paginationUpdated }: Props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1)
  const [maxNumberOfResults, setMaxNumberOfResults] = useState(0)

  const goToPreviousPage = () => {
    const newIndex = currentPageIndex - 1
    setCurrentPageIndex(newIndex)
    paginationUpdated(paginationInfo?.prev as string)
  }

  const goToNextPage = () => {
    const newIndex = currentPageIndex + 1
    setCurrentPageIndex(newIndex)
    paginationUpdated(paginationInfo?.next as string)
  }

  console.log(currentPageIndex * maxNumberOfResults, paginationInfo?.count)

  useMount(() => {
    if (paginationInfo?.numberOfResults) {
      console.log(paginationInfo)
      setMaxNumberOfResults(paginationInfo?.numberOfResults)
    }
  })

  if (paginationInfo)
    return (
      <nav
        aria-label="Pagination"
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {currentPageIndex * maxNumberOfResults - maxNumberOfResults}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {currentPageIndex * maxNumberOfResults}
              {/*ToDo handle last result i.e. 100 to 107*/}
            </span>{' '}
            of <span className="font-medium">{paginationInfo.count}</span>{' '}
            results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <Button disabled={currentPageIndex === 1} onClick={goToPreviousPage}>
            Previous
          </Button>
          <Button
            // ToDo fix next button disabled bug on last page
            disabled={
              currentPageIndex * maxNumberOfResults >= paginationInfo.count
            }
            onClick={goToNextPage}
          >
            Next
          </Button>
        </div>
      </nav>
    )
}
