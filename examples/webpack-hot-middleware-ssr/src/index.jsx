import { hydrateRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

hydrateRoot(
  document.getElementById('app'),
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
