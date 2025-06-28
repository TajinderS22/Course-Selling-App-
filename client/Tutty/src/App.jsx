import './App.css'
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './components/Home/Home'
import Authentication from './components/Authentication/Authentication';
import { AppProvider } from './context/AppContext';
import Dashboard from './components/User/Dashboard';
import { RecoilRoot } from 'recoil';



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
    }
  ]);
  return (
    <div className='max-w-[1920px] mx-auto'>
      <AppProvider>
        <RecoilRoot>
          <RouterProvider router={router}/>
        </RecoilRoot>
      </AppProvider>
    </div>
  );
}




export default App;
