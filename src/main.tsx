/** React */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

/** Styles */
import global from '_styles/global.module.scss';
import { Spin } from 'antd';

/** Lazy import pages */
const Traffic = React.lazy(() => import('./pages/traffic'));

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find root. null received as root element.');
}

rootElement.className = global.root;

const _root = ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* * is the 404 page */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spin size="large" />}>
                <Traffic />
              </Suspense>
            }
          />
        </>
      </Routes>
    </Router>
  </React.StrictMode>,
);
