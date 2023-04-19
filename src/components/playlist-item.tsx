import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Playlist } from '../interfaces/playlist'

interface PlaylistItemProps {
  playlist: Playlist
  setPlayList: React.Dispatch<React.SetStateAction<Playlist[]>>
}

export function PlaylistItem(props: PlaylistItemProps) {
  const { playlist, setPlayList } = props
  console.log('playList', playlist)
  const deletPlayList = (id: number, e: any) => {
    e.preventDefault()
    setPlayList(prePlaylist =>
      prePlaylist.filter(playlist => playlist.id !== id),
    )
  }

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
      <Col xs="12" md="8">
        <p className="mb-0">{playlist.description}</p>
      </Col>
      <Col xs="12" md="1" onClick={e => deletPlayList(playlist.id, e)}>
        x
      </Col>
    </Row>
  )
}
