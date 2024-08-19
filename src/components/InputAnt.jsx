import { Input } from 'antd'
import { useEffect } from 'react'

export default function InputAnt({ activeTab, query, setQuery, setDebouncedQuery, setPageSearch }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
      setPageSearch(1)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [query, setQuery, setDebouncedQuery, setPageSearch])

  let className = ''

  if (activeTab === '2') {
    className = 'main__input--hidden'
  } else {
    className = 'main__input'
  }

  return (
    <section className={className}>
      <Input
        id="search"
        name="search"
        placeholder="Type to search..."
        size="large"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
    </section>
  )
}
