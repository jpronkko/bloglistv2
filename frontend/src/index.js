import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'
import { BrowserRouter as Router } from 'react-router-dom'

const el = document.getElementById('root')
const root = createRoot(el)

console.log("env", process.env)

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)