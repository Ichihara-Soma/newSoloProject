import { useState } from 'react'
import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {Top} from './Top'
import {GamesList} from './GamesList'
import {GameContents} from './GameContents'


export const App = () => {
    const [name, setName] = useState(null)

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/top" element={<Top setName={setName} />} />
            <Route path="/game/list" element={<GamesList />} />
            <Route path="/game/contents" element={<GameContents name={name} />} />
        </Routes>
      </BrowserRouter>
  )
}
