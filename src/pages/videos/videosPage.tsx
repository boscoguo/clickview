import React, { useState, useEffect } from 'react'
import { Video } from '../../interfaces/video'
import VideoItem from '../../components/video-item'
import Spinner from 'react-bootstrap/Spinner'
import PaginationComponent from '../../components/pagination'

const VideosPage = () => {
  const [data, setData] = useState<Video[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('./videos.json')
      const data = await res.json()
      setData(data)
    }
    fetchData()
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }
  const isFetchedData = !!data.length
  return (
    <>
      {isFetchedData ? (
        currentItems.map(item => <VideoItem key={item.id} video={item} />)
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
      <PaginationComponent
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        paginate={paginate}
      />
    </>
  )
}

export default VideosPage
