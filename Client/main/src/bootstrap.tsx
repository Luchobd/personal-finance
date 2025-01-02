import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from 'core/store';

// Crea un fallback mientras el Store se inicializa
const FallbackLoader = () => <div>Cargando el estado global...</div>;

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <Suspense fallback={<FallbackLoader />}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Suspense>
    </React.StrictMode>,
  );
}
