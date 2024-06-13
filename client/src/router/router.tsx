import { createBrowserRouter } from 'react-router-dom';
import NicknameModal from '../components/modal/NicknameModal';
import RegistrationModal from '../components/modal/RegistrationModal';
import TeamspaceModal from '../components/modal/TeamspaceModal';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <NicknameModal />,
  },
  {
    path: '/registration',
    element: <RegistrationModal />,
  },
  {
    path: '/teamspaces',
    element: <TeamspaceModal />,
  },
]);
