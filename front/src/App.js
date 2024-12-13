import React, { useState, useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import Themeroutes from './routes/Router';
import { LoadingProvider, useLoading } from './LoadingContext';
import LoadingScreen from './components/LoadingScreen';

const App = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Set loading to true when the location changes
    setLoading(true);
    // Simulate loading time before hiding the loading screen
    const timer = setTimeout(() => setLoading(false), 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, [location]);

  const routing = useRoutes(Themeroutes);

  return (
    <div className="dark">
      {loading && <LoadingScreen />}
      {routing}
    </div>
  );
};

// Wrap the App component with the LoadingProvider
const AppWrapper = () => (
  <LoadingProvider>
    <App />
  </LoadingProvider>
);

export default AppWrapper;
