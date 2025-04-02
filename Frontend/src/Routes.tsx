import React from 'react'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import LoginUser from './pages/LoginUser'
import UserDashboard from './pages/UserDashboard'
import UserProductPreview from './component/User/UserProductPreview'
import UserCart from './component/User/UserCart'
// import Register from './pages/Register'

function Routes() {

  const Router = createBrowserRouter([
    {
        path: "/",
        element: <LoginUser/>
    },
    {
        path:"/register",
        element:<Register />
    },
    {
        path : "/Home",
        element: <Home />
    },
    {
        path : "/userpage",
        element: <UserDashboard />
    },
    {
      path:"/userProductPreview/:id",
      element:<UserProductPreview />
    },
    {
      path:"/cart",
      element:<UserCart />
    }
  ])
  return (
    <>
<RouterProvider router={Router} />
    </>
   )
}

export default Routes