import { useEffect, useState } from 'react'
import { Button } from '../button/Button'
import { classNames } from '../../../utils'

interface Props {
  paginationInfo?: PaginationInfo
  paginationUpdated: (followUpUrl: string) => void
  className?: string
}

export const Pagination = ({
  paginationInfo,
  paginationUpdated,
  className
}: Props) => {
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

  useEffect(() => {
    if (paginationInfo?.numberOfResults && maxNumberOfResults === 0) {
      setMaxNumberOfResults(paginationInfo?.numberOfResults)
    }
    if (paginationInfo?.prev === null) {
      setCurrentPageIndex(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationInfo])

  if (paginationInfo)
    return (
      <nav
        aria-label="Pagination"
        className={classNames(
          'flex items-center justify-between bg-white px-4 py-3 sm:px-6',
          className
        )}
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing{' '}
            <span className="font-medium">
              {currentPageIndex * maxNumberOfResults - maxNumberOfResults + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium">
              {currentPageIndex * maxNumberOfResults}
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
