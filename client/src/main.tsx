import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';
import styled from 'styled-components';
import { FlexColumn } from './styles/themes.ts';

const Screen = styled(FlexColumn)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Screen>
      <RouterProvider router={router} />
    </Screen>
  </React.StrictMode>
);
