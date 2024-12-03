import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'




import './index.css'

import App from './App.tsx'
import Homepage from './pages/homepage.tsx'
import Readlist from './pages/readpage.tsx'
import Wantlist from './pages/wantpage.tsx'
import Login from './pages/loginpage.tsx'
import Signup from './pages/newUserPage.tsx'
import ErrorPage from './pages/errorpage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/readlist',
        element: <Readlist />,
      },
      {
        path: '/wantlist',
        element: <Wantlist />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router}/>
  );
} else {
  console.error('Failed to find the root element');
}