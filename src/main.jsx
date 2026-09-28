import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import './css/style_header_footer.css'
import './css/style_home.css'
import './css/style_catalogo.css'
import './css/style_login.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
