import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { Video } from '../interfaces/video'
import { useParams } from 'react-router-dom'
import { Playlist } from '../interfaces/playlist'

interface VideoItemProps {
  video: Video
  canDelete?: boolean
  playListData?: Playlist[]
  setPlayListData?: React.Dispatch<React.SetStateAction<Playlist[]>>
}

export default function VideoItem(props: VideoItemProps) {
  const { video, canDelete = false, playListData, setPlayListData } = props
  const params = useParams()
  const onDelete = (id: number) => {
    setPlayListData &&
      setPlayListData(prevPlayList => {
        const currentPlayList = prevPlayList.filter(
          pl => pl.id === Number(params.id),
        )

        const currentPlayListIndex = prevPlayList.findIndex(
          pl => pl.id === Number(params.id),
        )

        const videoIdsWithUpdate = currentPlayList[0].videoIds.filter(
          videoId => videoId !== id,
        )

        const newCurrentPlayList = {
          ...currentPlayList[0],
          videoIds: videoIdsWithUpdate,
        }

        const prevPlayListClone = [...prevPlayList]

        prevPlayListClone.splice(currentPlayListIndex, 1, newCurrentPlayList)
        localStorage.setItem('localPlaylist', JSON.stringify(prevPlayListClone))
        return prevPlayListClone
      })
  }

  return (
    <Row>
      <Col xs="12" md="3" className="mb-3">
        <Image
          fluid
          rounded
          src={`${video.thumbnail}?size=small`}
          alt={video.name}
          className="w-100"
        />
      </Col>
      <Col xs="12" md="8" className="mb-3">
        <h2 className="h4">{video.name}</h2>
        <p>{video.description}</p>
      </Col>
      {canDelete && (
        <Col
          xs="12"
          md="1"
          onClick={() => {
            onDelete(video.id)
          }}
          style={{ cursor: 'pointer' }}
        >
          x
        </Col>
      )}
    </Row>
  )
}
