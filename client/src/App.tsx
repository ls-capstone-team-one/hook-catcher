import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom';
import { Home } from './components/custom-ui/Home';


function App() {
  return (
    <Router>
      {/* put navbar here bc all routes will have navbar
          will need conditional rendering for buttons 
      */}
      {/* <NavBar /> */}
      <Routes>
        {/* Home page: will include NewBinCreator, BinList, SuccessModal, FailureModal */}
        <Route path='/' element={<Home />} />
        {/* Bin page: will include bin info and request list */}
        {/* <Route path='/web/:id' element={<Bin /> } /> */}
      </Routes>
    </ Router>
  )
}

export default App;
