import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddNovel from './pages/AddNovel'
import EditNovel from './pages/EditNovel'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/add' element={<AddNovel/>} ></Route>
                    <Route path='/edit' element={<EditNovel/>} ></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App
