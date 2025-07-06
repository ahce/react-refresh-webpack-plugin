import { hydrateRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

// Uncomment this line to apply the fix
// window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.forEach((renderer) => renderer.setRefreshHandler(() => undefined));

hydrateRoot(
  document.getElementById('app'),
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
