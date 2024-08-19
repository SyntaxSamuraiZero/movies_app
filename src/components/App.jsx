import React, { useState } from 'react'
import { Alert } from 'antd'
import { Online, Offline } from 'react-detect-offline'
import 'reset-css'
import '../index.css'

import createGuestSession from '../services/createGuestSession'
import useFetch from '../services/useFetch'
import { GenresProvider } from '../context/GenresContext'
import TabsAnt from '../components/TabsAnt'
import InputAnt from '../components/InputAnt'
import MovieList from '../components/MovieList'
import PaginationAnt from '../components/PaginationAnt'

export default function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [pageSearch, setPageSearch] = useState(1)
  const [pageRated, setPageRated] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(null)
  const [activeTab, setActiveTab] = useState('1')

  createGuestSession()
  useFetch(
    setItems,
    setLoading,
    setError,
    activeTab,
    debouncedQuery,
    pageSearch,
    pageRated,
    setTotalPages,
    setTotalResults
  )

  return (
    <main className="main">
      <Offline>
        <Alert className="offline" message="Error" description="Отсутствует подключение к сети" type="error" showIcon />
      </Offline>
      <Online>
        <TabsAnt activeTab={activeTab} setActiveTab={setActiveTab} />
        <InputAnt
          activeTab={activeTab}
          query={query}
          setQuery={setQuery}
          setDebouncedQuery={setDebouncedQuery}
          setPageSearch={setPageSearch}
        />
        <GenresProvider setError={setError}>
          <MovieList items={items} loading={loading} error={error} totalResults={totalResults} />
        </GenresProvider>
        <PaginationAnt
          activeTab={activeTab}
          loading={loading}
          pageSearch={pageSearch}
          pageRated={pageRated}
          setPageSearch={setPageSearch}
          setPageRated={setPageRated}
          totalPages={totalPages}
        />
      </Online>
    </main>
  )
}
