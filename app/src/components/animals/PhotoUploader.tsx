import { useRef, useState, useImperativeHandle, forwardRef } from 'react'

interface PhotoItem {
  url: string
  isNew: boolean
  file?: File
}

export interface PhotoUploaderRef {
  getPhotos: () => { existing: string[]; newFiles: File[] }
}

interface PhotoUploaderProps {
  initialPhotos: string[]
  maxPhotos?: number
}

export const PhotoUploader = forwardRef<PhotoUploaderRef, PhotoUploaderProps>(
  function PhotoUploader({ initialPhotos, maxPhotos = 5 }, ref) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [items, setItems] = useState<PhotoItem[]>(
      initialPhotos.map((url) => ({ url, isNew: false }))
    )

    useImperativeHandle(ref, () => ({
      getPhotos: () => ({
        existing: items.filter((i) => !i.isNew).map((i) => i.url),
        newFiles: items.filter((i) => i.isNew && i.file).map((i) => i.file!),
      }),
    }))

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      if (files.length === 0) return

      const availableSlots = maxPhotos - items.length
      const filesToAdd = files.slice(0, availableSlots)

      const newItems: PhotoItem[] = filesToAdd.map((file) => ({
        url: URL.createObjectURL(file),
        isNew: true,
        file,
      }))

      setItems((prev) => [...prev, ...newItems])

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }

    const handleRemove = (index: number) => {
      const item = items[index]
      if (item.isNew && item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url)
      }
      setItems((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSetMain = (index: number) => {
      if (index === 0) return
      setItems((prev) => {
        const updated = [...prev]
        const [item] = updated.splice(index, 1)
        updated.unshift(item)
        return updated
      })
    }

    const canAddMore = items.length < maxPhotos

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photos ({items.length}/{maxPhotos})
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {items.map((item, index) => (
            <div
              key={`${item.url}-${index}`}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group"
            >
              <img
                src={item.url}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {index === 0 && (
                <span className="absolute top-1 left-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded">
                  Principal
                </span>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => handleSetMain(index)}
                    className="bg-white text-gray-700 p-1.5 rounded-full text-xs"
                    title="Définir comme principale"
                  >
                    ★
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="bg-red-500 text-white p-1.5 rounded-full text-xs"
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>

              {item.isNew && (
                <span className="absolute bottom-1 right-1 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                  Nouveau
                </span>
              )}
            </div>
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-orange-400 flex items-center justify-center text-gray-400 hover:text-orange-500 transition-colors"
            >
              <span className="text-2xl">+</span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        <p className="text-xs text-gray-500 mt-2">
          Formats acceptés: JPG, PNG, WebP. Max 1MB après compression.
        </p>
      </div>
    )
  }
)
