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

  const createPlayList = () => {
    const newPlayList = {
      name: 'new one',
      description: '',
      id: 2038133,
      videoIds: [128178, 128147],
      dateCreated: '2021-02-22T03:28:02',
    }
    setData(prevPlayList => [...prevPlayList, newPlayList])
  }
  const isFetchedData = !!data.length
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      >
        <button onClick={createPlayList}>Create</button>
      </div>
      {isFetchedData ? (
        data.map(item => (
          <Link key={item.id} to={`/playlists/${item.id}`}>
            <PlaylistItem playlist={item} setPlayList={setData} />
          </Link>
        ))
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
    </>
  )
}

export default PlaylistsPage
