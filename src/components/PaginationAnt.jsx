import { Pagination } from 'antd'

export default function PaginationAnt({
  activeTab,
  loading,
  pageSearch,
  pageRated,
  setPageSearch,
  setPageRated,
  totalPages,
}) {
  const handlePageChange = (newPage, setPage) => {
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  const renderPagination = (currentPage, setPage) => (
    <section className="main__pagination">
      {!loading && (
        <Pagination
          onChange={(newPage) => handlePageChange(newPage, setPage)}
          align="center"
          total={totalPages * 10}
          showSizeChanger={false}
          hideOnSinglePage={true}
          current={currentPage}
          defaultCurrent={1}
        />
      )}
    </section>
  )

  return activeTab === '1' ? renderPagination(pageSearch, setPageSearch) : renderPagination(pageRated, setPageRated)
}
