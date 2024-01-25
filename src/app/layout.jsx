import { Poppins } from 'next/font/google'
import '@/styles/global.scss'
import { AuthProvider } from './Providers'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './panel.module.scss'
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: "Balance y Transacciones - FinazApp",
  description: "Optimiza tu gestión financiera con FinazApp. Accede al estado actual de tus finanzas, categoriza tus transacciones y toma el control de tu dinero de forma inteligente.",
}

export const viewport = {
  themeColor: 'black',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <Header />
          {
            session ? (
              <div className={styles.container}>
                <main>
                  {children}
                </main>
                <Footer />
              </div>
            ) : (
              <>
                {children}
              </>
            )
          }
        </AuthProvider>
      </body>
    </html>
  )
}
