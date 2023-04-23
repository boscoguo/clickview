import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { PaginationProps } from '../interfaces/pagination'

const PaginationComponent: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const [activePage, setActivePage] = useState<number>(1)
  const [active, setActive] = useState<{ first: boolean; last: boolean }>({
    first: false,
    last: false,
  })

  const totalPage = Math.ceil(totalItems / itemsPerPage)

  const pageNumbers = []
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i)
  }

  const singlePaginationBtnAction = (pageNumber: number) => {
    setActivePage(pageNumber)
    paginate(pageNumber)
  }

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === 1) {
      setActive({ first: true, last: false })
    } else if (pageNumber === totalPage) {
      setActive({ first: false, last: true })
    } else {
      setActive({ first: false, last: false })
    }
    singlePaginationBtnAction(pageNumber)
  }

  const handleGoPrev = () => {
    if (activePage === 1) {
      setActive(prevActive => ({
        ...prevActive,
        first: true,
      }))
      return
    }
    if (active.last) {
      setActive(prevActive => ({
        ...prevActive,
        last: false,
      }))
    }
    singlePaginationBtnAction(activePage - 1)
  }

  const handleGoNext = () => {
    if (active.first) {
      setActive(prevActive => ({
        ...prevActive,
        first: false,
      }))
    }
    if (activePage === totalPage) {
      setActive(prevActive => ({
        ...prevActive,
        last: true,
      }))
      return
    }
    singlePaginationBtnAction(activePage + 1)
  }

  const handleGoFirst = () => {
    setActive(prevActive => ({
      ...prevActive,
      first: true,
    }))
    if (active.last) {
      setActive(prevActive => ({
        ...prevActive,
        last: false,
      }))
    }
    singlePaginationBtnAction(1)
  }

  const handleGoLast = () => {
    setActive(prevActive => ({
      ...prevActive,
      last: true,
    }))
    if (active.first) {
      setActive(prevActive => ({
        ...prevActive,
        first: false,
      }))
    }
    singlePaginationBtnAction(totalPage)
  }

  const renderPageNumbers = (
    <>
      <Pagination.First
        onClick={handleGoFirst}
        disabled={active.first}
        data-testid="go-first"
      />
      <Pagination.Prev
        onClick={handleGoPrev}
        disabled={active.first}
        data-testid="go-forward"
      />
      {pageNumbers.map(number => {
        return (
          <Pagination.Item
            key={number}
            active={number === activePage}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </Pagination.Item>
        )
      })}
      <Pagination.Next
        onClick={handleGoNext}
        disabled={active.last}
        data-testid="go-next"
      />
      <Pagination.Last
        onClick={handleGoLast}
        disabled={active.last}
        data-testid="go-last"
      />
    </>
  )

  return (
    <Pagination className="justify-content-center mt-3">
      {renderPageNumbers}
    </Pagination>
  )
}

export default PaginationComponent
