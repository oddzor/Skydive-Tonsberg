
import { useCMSDataFromSanity } from '@/contexts/SanityDataContext'

export type { CMSContent } from './useCMSContent.types'

export const useCMSContent = () => {
  const data = useCMSDataFromSanity()
  const content = {
    home: data.home,
    pricing: data.pricing,
    course: data.course,
    tandem: data.tandem,
  }
  return { content, loading: false }
}
