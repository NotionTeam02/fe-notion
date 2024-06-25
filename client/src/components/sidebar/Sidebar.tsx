import { AppstoreOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { themes, ColumnGap, SideMenu } from '../../styles/themes';
import { TeamspaceDescription, UserDescription } from '../../constants';
import { useParams } from 'react-router-dom';
import { sendTeamspaceRequestById } from '../../api/teamspaceAPI';
import { useSuspenseQuery } from '@tanstack/react-query';
import Teamspace from './Teamspace';

export interface SidebarProps {
  teamspace: TeamspaceDescription;
  users: UserDescription[];
}

const {
  Color: { WeakColor },
  FontSize: { Default },
} = themes;

export default function Sidebar() {
  const { teamspaceId } = useParams();

  const { data: teamspace } = useSuspenseQuery<TeamspaceDescription>({
    queryKey: [`teamspace-${teamspaceId}`],
    queryFn: () => sendTeamspaceRequestById(teamspaceId || ''),
    refetchOnWindowFocus: false,
  });

  return (
    <Wrapper>
      <SideMenu>
        <HomeButton />
        <span>홈</span>
      </SideMenu>
      <SideMenu>
        <SettingButton />
        <span>설정</span>
      </SideMenu>
      {teamspace && <Teamspace {...teamspace} />}
      <SideMenu>
        <TemplateButton />
        <span>템플릿</span>
      </SideMenu>
      {/* <SideMenu>현재 접속한 유저</SideMenu>
      users.map((user, index) => (
        <UserStatus key={`sidemenu-${index}`} {...user} />
      ))} */}
    </Wrapper>
  );
}

const Wrapper = styled(ColumnGap)`
  font-size: ${Default};
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 16px 8px;
  width: 240px;
  height: 100vh;
  background-color: #f7f7f5;
  justify-content: flex-start;
`;

const HomeButton = styled(HomeOutlined)`
  color: ${WeakColor};
`;

const SettingButton = styled(SettingOutlined)`
  color: ${WeakColor};
`;

const TemplateButton = styled(AppstoreOutlined)`
  color: ${WeakColor};
`;
