import React, { useState, useEffect } from 'react'
import { Video } from '../../interfaces/video'
import VideoItem from '../../components/video-item'
import Spinner from 'react-bootstrap/Spinner'

const VideosPage = () => {
  const [data, setData] = useState<Video[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('./videos.json')
      const data = await res.json()
      setData(data)
    }
    fetchData()
  }, [])
  const isFetchedData = !!data.length
  return (
    <>
      {isFetchedData ? (
        data.map(item => <VideoItem key={item.id} video={item} />)
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
    </>
  )
}

export default VideosPage
