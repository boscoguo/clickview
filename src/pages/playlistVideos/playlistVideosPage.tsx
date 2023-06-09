import React, { useState, useEffect } from 'react'
import { PlaylistVideos } from '../../interfaces/playlistVideos'
import { Playlist } from '../../interfaces/playlist'
import { Video } from '../../interfaces/video'
import VideoItem from '../../components/video-item'

const PlaylistVideosPage: React.FC<PlaylistVideos> = ({ id }) => {
  const [playListData, setPlayListData] = useState<Playlist[]>([])

  const [videosData, setVideosData] = useState<Video[]>([])

  useEffect(() => {
    const localPlaylist = localStorage.getItem('localPlaylist')
    const fetchPlayListData = async () => {
      const res = await fetch('../playlists.json')
      const data = await res.json()
      setPlayListData(localPlaylist ? JSON.parse(localPlaylist) : data)
    }
    fetchPlayListData()
  }, [])

  useEffect(() => {
    const fetchVideosData = async () => {
      const res = await fetch('../videos.json')
      const data = await res.json()
      setVideosData(data)
    }
    fetchVideosData()
  }, [])

  const currentPlayList = playListData.filter(playlist => playlist.id === id)

  const videosInPlayList = videosData.filter(video => {
    return currentPlayList[0].videoIds.includes(video.id)
  })

  return (
    <>
      {videosInPlayList.map(video => (
        <VideoItem
          key={video.id}
          video={video}
          canDelete={true}
          playListData={playListData}
          setPlayListData={setPlayListData}
        />
      ))}
    </>
  )
}

export default PlaylistVideosPage
