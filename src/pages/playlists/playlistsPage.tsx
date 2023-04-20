import React, { useState, useEffect } from 'react'
import { Playlist } from '../../interfaces/playlist'
import { PlaylistItem } from '../../components/playlist-item'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import AddVideosModal from '../../components/addVideosModal'

const PlaylistsPage = () => {
  const [data, setData] = useState<Playlist[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [checked, setChecked] = useState<{ [id: number]: boolean }>({})
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number>(0)

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

  const handleOpenModal = (id: number, e: any) => {
    e.preventDefault()
    setSelectedPlaylistId(id)
  }

  const handleClose = () => setShow(false)

  const handleShow = () => setShow(true)

  const handleCheckboxClick = (id: number, e: any) => {
    setChecked(prevState => ({
      ...prevState,
      [id]: e.target.checked,
    }))
  }

  const getAllCheckedVideos = () => {
    const checkedVideos = Object.entries(checked).filter(
      ([key, value]) => value === true,
    )
    const checkedVideosObj = Object.fromEntries(checkedVideos)

    const checkedVideoArr = Object.keys(checkedVideosObj).map(checked =>
      parseInt(checked),
    )

    return checkedVideoArr
  }

  const onAddVideos = () => {
    const currentPlayList = data.filter(pl => pl.id === selectedPlaylistId)

    const currentPlayListIndex = data.findIndex(
      pl => pl.id === selectedPlaylistId,
    )

    const checkedVideos = getAllCheckedVideos()

    const videoIdsWithUpdate = [
      ...currentPlayList[0].videoIds,
      ...checkedVideos,
    ]

    const videoUnduplicateIdsWithUpdate = [...new Set(videoIdsWithUpdate)]

    const newCurrentPlayList = {
      ...currentPlayList[0],
      videoIds: videoUnduplicateIdsWithUpdate,
    }

    const dataClone = [...data]

    dataClone.splice(currentPlayListIndex, 1, newCurrentPlayList)
    localStorage.setItem('localPlaylist', JSON.stringify(dataClone))
    setData(dataClone)
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
            <PlaylistItem
              playlist={item}
              setPlayList={setData}
              handleOpenModal={handleOpenModal}
              handleShow={handleShow}
            />
          </Link>
        ))
      ) : (
        <Spinner animation="border" variant="warning" />
      )}
      <AddVideosModal
        show={show}
        handleClose={handleClose}
        handleCheckboxClick={handleCheckboxClick}
        onAddVideos={onAddVideos}
      />
    </>
  )
}

export default PlaylistsPage
