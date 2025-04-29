import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';
import Onboarding from './pages/Onboarding';
import Payment from './pages/Payment';
import Leaderboard from './pages/Leaderboard';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const App: React.FC = () => {
  useEffect(() => {
    // Check if we're running inside Telegram WebApp
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Initialize WebApp
      tg.ready();
      tg.expand();

      // Запрашиваем полноэкранный режим
      tg.requestFullscreen();

      // Подписываемся на изменения полноэкранного режима
      const handleFullscreenChange = () => {
        console.log('Fullscreen mode changed:', tg.isFullscreen);
      };

      tg.onEvent('fullscreenChanged', handleFullscreenChange);

      // Log initialization for debugging
      console.log('Telegram WebApp initialized:', {
        initData: tg.initData,
        user: tg.initDataUnsafe.user,
        isFullscreen: tg.isFullscreen
      });

      // Отписываемся от событий при размонтировании
      return () => {
        tg.offEvent('fullscreenChanged', handleFullscreenChange);
      };
    } else {
      console.log('Running outside of Telegram WebApp');
    }
  }, []);

  console.log('App rendering');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <HashRouter>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/" element={<Navigate to="/onboarding" replace />} />
          </Routes>
        </HashRouter>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App; 