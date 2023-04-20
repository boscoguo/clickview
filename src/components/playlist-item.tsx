import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Playlist } from '../interfaces/playlist'

interface PlaylistItemProps {
  playlist: Playlist
  setPlayList: React.Dispatch<React.SetStateAction<Playlist[]>>
  onAddVideos: (id: number, e: any) => void
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, setPlayList, onAddVideos } = props

  const deletPlayList = (id: number, e: any) => {
    e.preventDefault()
    setPlayList(prePlaylist =>
      prePlaylist.filter(playlist => playlist.id !== id),
    )
  }

  // const onAddVideos = (id: number, e: any) => {
  //   e.preventDefault()
  // }

  const videoCount =
    playlist.videoIds.length === 1
      ? '1 video'
      : `${playlist.videoIds.length} videos`

  return (
    <Row className="border rounded p-2 mb-2">
      <Col xs="12" md="3">
        <h2 className="h5">{playlist.name}</h2>
        <p className="mb-0">{videoCount}</p>
      </Col>
      <Col xs="12" md="6">
        <p className="mb-0">{playlist.description}</p>
      </Col>
      <Col xs="12" md="2">
        <button onClick={e => onAddVideos(playlist.id, e)}>add videos</button>
      </Col>
      <Col xs="12" md="1" onClick={e => deletPlayList(playlist.id, e)}>
        x
      </Col>
    </Row>
  )
}
