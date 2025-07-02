import './App.css'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home/Home'
import Authentication from './components/Authentication/Authentication';
import { AppProvider } from './context/AppContext';
import Dashboard from './app/User/Dashboard';
import { RecoilRoot } from 'recoil';
import AuthenticationAdmin from './app/Admin/AuthenticationAdmin';
import AdminDashBoard from './app/Admin/AdminDashBoard'
import CreateCourse from './app/Admin/CreateCourse';
import BuyCourse from './components/BuyCourse';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer'


function App() {
  const router = createBrowserRouter([
    { 
      path: "/", 
      Component: Home
    },
    {
      path:"/authentication",
      element: <Authentication/>
    },
    {
      path:"/dashboard",
      element: <Dashboard/>
    },
    {
      path:"/admin/authentication",
      element:<AuthenticationAdmin/>
    },
    {
      path:"/admin/dashboard",
      element:<AdminDashBoard/>
    },
    {
      path:"/admin/create-course",
      element:<CreateCourse/>
    },
    {
      path:"/buyCourse",
      element:<BuyCourse/>
    },
    {
      path:"/Aboutus",
      element:<AboutUs/>
    }
  ]);
  return (
    <div className='max-w-[1920px] mx-auto'>
      <AppProvider>
        <RecoilRoot>
          <RouterProvider router={router}/>
        </RecoilRoot>
      </AppProvider>
      <Footer/>
    </div>
  );
}




export default App;
