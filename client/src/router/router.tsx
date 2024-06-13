import { createBrowserRouter } from 'react-router-dom';
import NicknameModal from '../components/modal/NicknameModal';
import RegistrationModal from '../components/modal/RegistrationModal';
import TeamspaceModal from '../components/modal/TeamspaceModal';
import styled from 'styled-components';
import { FlexColumn } from '../styles/themes';

const Screen = styled(FlexColumn)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <Screen>
        <NicknameModal />
      </Screen>
    ),
  },
  {
    path: '/registration',
    element: (
      <Screen>
        <RegistrationModal />
      </Screen>
    ),
  },
  {
    path: '/teamspaces',
    element: (
      <Screen>
        <TeamspaceModal />
      </Screen>
    ),
  },
]);
