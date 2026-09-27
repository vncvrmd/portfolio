import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { MotionPreferenceProvider } from './motionPreference'
import { IntroProvider } from './components/Intro'
import { SoundProvider } from './soundPreference'
import 'lenis/dist/lenis.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionPreferenceProvider>
        <SoundProvider>
          <IntroProvider>
            <App />
          </IntroProvider>
        </SoundProvider>
      </MotionPreferenceProvider>
    </BrowserRouter>
  </React.StrictMode>
)
