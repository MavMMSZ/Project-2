import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.tsx'
import Homepage from './pages/homepage.tsx'
import Readlist from './pages/readlist.tsx'
import Wantlist from './pages/wantList.tsx'
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