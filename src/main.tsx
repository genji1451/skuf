import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Failed to find the root element');
  }

  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log('App successfully mounted');
  } catch (error) {
    console.error('Error rendering app:', error);
    // Показываем ошибку пользователю
    container.innerHTML = `
      <div style="padding: 20px; color: red;">
        Произошла ошибка при загрузке приложения. 
        Пожалуйста, обновите страницу.
      </div>
    `;
  }
};

renderApp(); 