import React, { useState, useEffect } from 'react'
import { Playlist } from '../../interfaces/playlist'
import { PlaylistItem } from '../../components/playlist-item'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import AddVideosModal from '../../components/addVideosModal'
// import { Modal } from 'react-bootstrap'

const PlaylistsPage = (props: any) => {
  const [data, setData] = useState<Playlist[]>([])
  const [show, setShow] = useState<boolean>(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  useEffect(() => {
    const localPlaylist = localStorage.getItem('localPlaylist')
    const fetchData = async () => {
      const res = await fetch('./playlists.json')
      const data = await res.json()
      setData(localPlaylist ? JSON.parse(localPlaylist) : data)
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

  const onAddVideos = (id: number, e: any) => {
    e.preventDefault()
  }

  // const modalProps = {
  //   show: modalShow,
  //   onHide: () => setModalShow(false),
  //   ...props,
  // }
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
            <PlaylistItem
              playlist={item}
              setPlayList={setData}
              onAddVideos={onAddVideos}
            />
          </Link>
        ))
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
      <AddVideosModal />
      {/* <AddVideosModal {...modalProps} /> */}
    </>
  )
}

export default PlaylistsPage
