import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import type { SpaInfo } from '@/types/spaInfo'

const DOC_PATH = 'spaInfo/main'

export const spaInfoService = {
  async get(): Promise<SpaInfo | null> {
    const docSnap = await getDoc(doc(db, DOC_PATH))
    if (!docSnap.exists()) {
      return null
    }
    return { id: docSnap.id, ...docSnap.data() } as SpaInfo
  },

  async update(data: Partial<Omit<SpaInfo, 'id'>>): Promise<void> {
    await setDoc(
      doc(db, DOC_PATH),
      {
        ...data,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  },
}
