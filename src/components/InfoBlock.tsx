import React from 'react'

interface InfoBlockProps {
  color?: 'blue' | 'yellow' | 'gray'
  title?: string
  children: React.ReactNode
  className?: string
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    border: 'border-blue-400 dark:border-blue-500',
    title: 'text-blue-900 dark:text-blue-100',
    text: 'text-blue-900 dark:text-blue-100',
  },
  yellow: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/30',
    border: 'border-yellow-400 dark:border-yellow-500',
    title: 'text-yellow-900 dark:text-yellow-100',
    text: 'text-yellow-900 dark:text-yellow-100',
  },
  gray: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    border: '',
    title: 'text-gray-900 dark:text-white',
    text: 'text-gray-700 dark:text-gray-200',
  },
}

export function InfoBlock({
  color = 'blue',
  title,
  children,
  className = '',
}: InfoBlockProps) {
  const c = colorMap[color]
  return (
    <div
      className={`rounded-md shadow-sm p-4 mt-2 ${c.bg} ${c.border} ${className}`.trim()}
    >
      {title && (
        <h2 className={`text-2xl font-bold mb-2 ${c.title}`}>{title}</h2>
      )}
      <div className={c.text}>{children}</div>
    </div>
  )
}
