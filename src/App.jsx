import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddNovel from './pages/AddNovel'

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/add' element={<AddNovel/>} ></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default App
