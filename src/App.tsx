import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminHome } from "./pages/admin/home"
import { Login } from "./pages/login"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='admin' element={<AdminHome/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
