import React, { useState, useEffect } from 'react'
import { Playlist } from '../../interfaces/playlist'
import { PlaylistItem } from '../../components/playlist-item'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const PlaylistsPage = () => {
  const [data, setData] = useState<Playlist[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('./playlists.json')
      const data = await res.json()
      setData(data)
    }
    fetchData()
  }, [])
  const isFetchedData = !!data.length
  return (
    <>
      {isFetchedData ? (
        data.map(item => (
          <Link key={item.id} to={`/playlists/${item.id}`}>
            <PlaylistItem playlist={item} />
          </Link>
        ))
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
    </>
  )
}

export default PlaylistsPage
