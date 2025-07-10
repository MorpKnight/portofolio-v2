import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './App.jsx';
import HomePage from './pages/home-page.jsx';
import AllProjectsPage from './pages/all-projects-page.jsx';
import ProjectDetailPage from './pages/project-detail-page.jsx';
import LoadingSpinner from './components/loading-spinner.jsx';
import ScrollToTop from './components/scroll-to-top.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import './i18next.js';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MinecraftServerPage from './pages/minecraft-server.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <ThemeProvider> {/* Wrap with ThemeProvider */}
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="projects" element={<AllProjectsPage />} />
              <Route path="projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="minecraft" element={<MinecraftServerPage projectId="minecraft" />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
);