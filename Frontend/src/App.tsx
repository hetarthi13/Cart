import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routes from './Routes'
import { Provider } from 'react-redux'
import store from './redux/store'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={store}>
  
<Routes />
</Provider>

    </>
  )
}

export default App
