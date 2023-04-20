import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AddVideosModaProps } from '../interfaces/addVideosModal'
import { Video } from '../interfaces/video'
import VideoItem from '../components/video-item'

const AddVideosModal: React.FC<AddVideosModaProps> = ({
  show,
  handleClose,
  handleCheckboxClick,
  onAddVideos,
}) => {
  const [videosData, setVideosData] = useState<Video[]>([])
  useEffect(() => {
    const fetchVideosData = async () => {
      const res = await fetch('../videos.json')
      const data = await res.json()
      setVideosData(data)
    }
    fetchVideosData()
  }, [])

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please add videos into playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {videosData.map(item => (
            <VideoItem
              key={item.id}
              video={item}
              canAdd={true}
              handleCheckboxClick={handleCheckboxClick}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onAddVideos}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddVideosModal
