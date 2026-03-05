import { Header, Footer } from '@/components/layout'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ScrollToTop } from '@/components/ScrollToTop'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
