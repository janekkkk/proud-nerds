import { useState } from 'react'
import { Button } from '../button/Button'

interface Props {
  paginationInfo?: PaginationInfo
  paginationUpdated: (followUpUrl: string) => void
}

export const Pagination = ({ paginationInfo, paginationUpdated }: Props) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(1)

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
              {currentPageIndex * paginationInfo.numberOfResults -
                paginationInfo.numberOfResults}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {currentPageIndex * paginationInfo.numberOfResults}
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
            disabled={
              currentPageIndex * paginationInfo.numberOfResults >=
              paginationInfo.count
            }
            onClick={goToNextPage}
          >
            Next
          </Button>
        </div>
      </nav>
    )
}
