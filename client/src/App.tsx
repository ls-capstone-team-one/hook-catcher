import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "@/components/custom-ui/Home"
import BinView from "@/features/bin-view/BinView"
import GHInvertoCat from "./components/custom-ui/Github"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bins/:id" element={<BinView />} />
        </Routes>
      </Router>
      <GHInvertoCat  
        className="fixed bottom-4 right-4 w-10"
        url="https://github.com/ls-capstone-team-one/hook-catcher"
      />
    </>
  )
}

export default App
