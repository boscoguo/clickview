import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { PaginationProps } from '../interfaces/pagination'

const PaginationComponent: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const [activePage, setActivePage] = useState(1)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePageClick = (event: any) => {
    setActivePage(Number(event.target.text))
    paginate(Number(event.target.text))
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={handlePageClick}
      >
        {number}
      </Pagination.Item>
    )
  })

  return (
    <Pagination className="justify-content-center mt-3">
      {renderPageNumbers}
    </Pagination>
  )
}

export default PaginationComponent
