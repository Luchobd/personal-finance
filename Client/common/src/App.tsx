import React, { Suspense } from 'react';
import './App.css';
import components from '../public/json/components.json';

const loadComponent = (path: string) => React.lazy(() => import(`${path}`));

const App: React.FC = () => {
  return (
    <>
      <header>
        <h1>Listado de Componentes COMMON</h1>
      </header>
      <main>
        {components.map(({ title, path, location }) => {
          const Component = loadComponent(path);
          return (
            <article key={title}>
              <h2>Titulo: {title}</h2>
              <h3>Ubicación: {location}</h3>
              <Suspense fallback={<div>Cargando {title}...</div>}>
                <Component />
              </Suspense>
            </article>
          )
        })}
      </main>
    </>
  );
};

export default App;