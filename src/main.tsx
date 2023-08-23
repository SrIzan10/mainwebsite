import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Blog from "./Blog.tsx";
import {BlogPost} from "./BlogPost.tsx";

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
    }
]);

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0d0d0d',
            paper: '#0d0d0d'
        }
    },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
          <RouterProvider router={router} />
      </ThemeProvider>
  </React.StrictMode>,
)
