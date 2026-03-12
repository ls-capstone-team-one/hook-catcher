import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "@/components/custom-ui/Home"
import BinView from "@/features/bin-view/BinView"
import GHInvertoCat from "./components/custom-ui/Github"

function App() {
  return (
    <>
      <Router>
        {/* put navbar here bc all routes will have navbar
            will need conditional rendering for buttons 
        */}
        {/* <NavBar /> */}
        <Routes>
          {/* Home page: will include NewBinCreator, BinList, SuccessModal, FailureModal */}
          <Route path="/" element={<Home />} />
          {/* Bin page: will include bin info and request list */}
          <Route path="/bins/:id" element={<BinView />} />
        </Routes>
      </Router>
      <GHInvertoCat  
        className="fixed bottom-4 right-4 w-[40px]"
        url="https://github.com/ls-capstone-team-one/hook-catcher"
      />
    </>
  )
}

export default App
