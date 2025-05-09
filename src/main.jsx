// src/main.jsx
import React, { Suspense } from 'react'; // Add Suspense
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './App.jsx';
import HomePage from './pages/home-page.jsx';
import AllProjectsPage from './pages/all-projects-page.jsx';

import './i18next.js'

import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your app with Suspense for lazy loading translations */}
    <Suspense fallback="Loading...">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="all-projects" element={<AllProjectsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);