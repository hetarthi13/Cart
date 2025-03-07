import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import LoginUser from './pages/LoginUser'
// import Register from './pages/Register'

function Routes() {

  const Router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path:"/register",
        element:<Register />
    },
    {
        path : "/login",
        element: <LoginUser />
    }
  ])
  return (
    <>
<RouterProvider router={Router} />
    </>
   )
}

export default Routes