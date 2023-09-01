import './globals.css'
import { Inter } from 'next/font/google'
import MainLayout from '@/components/MainLayout'
import Provider from "./Provider";

const inter = Inter({ subsets: ['latin'] }) 

export const metadata = {
  title: 'Campus',
  description: 'Campus para aprender inglés con profesores',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Provider>
          <MainLayout />
          {children}
        </Provider>
      </body>
    </html >
  )
}
