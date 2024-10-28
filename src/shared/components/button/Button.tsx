import { ReactNode } from 'react'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  disabled?: boolean
  className?: string
  children?: ReactNode
  onClick?: () => void
}

export const Button = ({ className, children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={
        'relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 disabled:bg-gray-100 hover:bg-gray-50 focus-visible:outline-offset-0 ' +
        className
      }
    >
      {children}
    </button>
  )
}
