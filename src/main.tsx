import './styles/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainProviders from './provider/MainLayout.tsx'
import { RouterProvider } from 'react-router-dom'
import router from '@/router.ts'
import LoadingPage from '@/pages/loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProviders>
      <RouterProvider
        router={router}
        fallbackElement={<LoadingPage />}
      />
    </MainProviders>
  </StrictMode>,
)
