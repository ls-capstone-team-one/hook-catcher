import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import BinView from "./components/custom-ui/request-details.tsx"
import Jm from "./features/jm_sandbox/Jm.tsx"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/web/1234" element={<BinView />} />
          <Route path="/sv" element={<BinView />} />
          <Route path="/jm" element={<Jm />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
