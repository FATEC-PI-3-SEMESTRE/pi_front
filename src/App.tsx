import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminHome } from "./pages/admin/home"
import { Login } from "./pages/login"
import { AdminUser } from "./pages/admin/user"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/admin/user' element={<AdminUser/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
