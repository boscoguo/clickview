import React from 'react'
import { useParams } from 'react-router-dom'
import PlaylistVideosPage from '../pages/playlistVideos/playlistVideosPage'

export function PlaylistVideos() {
  const params = useParams()
  return (
    <main>
      <h1>Playlist route for playlist id: {params.id}</h1>
      <PlaylistVideosPage id={Number(params.id)} />
    </main>
  )
}
