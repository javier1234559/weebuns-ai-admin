import './styles/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainProviders from './provider/MainLayout.tsx'
import { RouterProvider } from 'react-router-dom'
import { AppFallback } from '@/components/common/app-fall-back/index.tsx'
import router from '@/router.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProviders>
      <RouterProvider
        router={router}
        fallbackElement={<AppFallback />}
      />
    </MainProviders>
  </StrictMode>,
)
