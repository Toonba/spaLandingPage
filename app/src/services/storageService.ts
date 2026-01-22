import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './firebase'
import imageCompression from 'browser-image-compression'

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
}

export const storageService = {
  async uploadPhoto(file: File, animalId: string): Promise<string> {
    const compressed = await imageCompression(file, compressionOptions)

    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`
    const storageRef = ref(storage, `animals/${animalId}/${fileName}`)

    await uploadBytes(storageRef, compressed)

    return getDownloadURL(storageRef)
  },

  async deletePhoto(url: string): Promise<void> {
    try {
      const storageRef = ref(storage, url)
      await deleteObject(storageRef)
    } catch (error) {
      console.error('Error deleting photo:', error)
    }
  },
}
