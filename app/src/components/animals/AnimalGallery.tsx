import { useState } from 'react'

interface AnimalGalleryProps {
  photos: string[]
  mainPhoto: string
  name: string
}

export function AnimalGallery({ photos, mainPhoto, name }: AnimalGalleryProps) {
  const allPhotos = [mainPhoto, ...photos.filter((p) => p !== mainPhoto)]
  const [selectedPhoto, setSelectedPhoto] = useState(allPhotos[0] || mainPhoto)

  if (!mainPhoto && photos.length === 0) {
    return (
      <div className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center">
        <span className="text-gray-400 text-6xl">🐾</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
          src={selectedPhoto}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {allPhotos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setSelectedPhoto(photo)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedPhoto === photo
                  ? 'border-orange-500'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img
                src={photo}
                alt={`${name} - photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
