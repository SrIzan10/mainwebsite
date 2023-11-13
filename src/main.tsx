import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './css/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Blog from "./pages/Blog.tsx";
import { BlogPost } from "./components/BlogPost.tsx";
import AnalyticsNotice from "./components/AnalyticsNotice.tsx";
import Collab from './pages/Collab.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/blog",
        element: <Blog />,
    },
    {
        path: "/blog/:id",
        element: <BlogPost />
    },
    {
        path: '/collab',
        element: <Collab />
    }
]);

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
const darkTheme = createTheme({
    palette: {
        mode: prefersDarkMode.matches ? 'dark' : 'light',
        background: {
            default: prefersDarkMode.matches ? '#0d0d0d' : '#fafafa',
            paper: prefersDarkMode.matches ? '#0d0d0d' : '#fafafa',
        }
    },
});

prefersDarkMode.addEventListener('change', () => {
    location.reload()
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
          <AnalyticsNotice />
          <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
