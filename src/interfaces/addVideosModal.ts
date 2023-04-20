export interface AddVideosModaProps {
  show: boolean
  handleClose: () => void
  handleCheckboxClick?: (id: number, e: any) => void
  onAddVideos: () => void
}
