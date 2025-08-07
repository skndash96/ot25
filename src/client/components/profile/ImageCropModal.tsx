import { useRef, useState } from "react"
import ReactCrop, { Crop, PixelCrop } from "react-image-crop"

export default function ImageCropModal({
  src,
  isOpen,
  onClose,
  onCropComplete,
}: {
  src: string
  isOpen: boolean
  onClose: () => void
  onCropComplete: (croppedImageUrl: string) => void
}) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const size = Math.min(width, height)
    const x = (width - size) / 2
    const y = (height - size) / 2

    setCrop({
      unit: 'px',
      width: size,
      height: size,
      x,
      y,
    })
  }

  const getCroppedImg = () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = completedCrop.width
    canvas.height = completedCrop.height

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height,
    )

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const croppedImageUrl = URL.createObjectURL(blob)
          onCropComplete(croppedImageUrl)
        }
      },
      'image/jpeg',
      0.95,
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-lg max-w-2xl max-h-[90vh] overflow-auto">
        <h3 className="text-xl font-semibold text-amber-400 mb-4">Crop Your Profile Picture</h3>

        <div className="mb-4">
          <ReactCrop
            crop={crop}
            onChange={setCrop}
            onComplete={setCompletedCrop}
            aspect={1}
            minWidth={100}
            minHeight={100}
            keepSelection
          >
            <img
              ref={imgRef}
              src={src}
              onLoad={onImageLoad}
              style={{ maxWidth: '100%', maxHeight: '400px' }}
              alt="Crop me"
            />
          </ReactCrop>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-amber-300 border border-amber-400 rounded hover:bg-amber-900/30"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={getCroppedImg}
            className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-600"
          >
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  )
}