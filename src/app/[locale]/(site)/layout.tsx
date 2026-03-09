import { Header, Footer } from '@/components/layout'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ScrollToTop } from '@/components/ScrollToTop'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function SiteLayout({ children, params }: Props) {
  const { locale } = await params
  const initialLocale = locale === 'en' ? 'en' : 'no'
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <ScrollToTop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  )
}
