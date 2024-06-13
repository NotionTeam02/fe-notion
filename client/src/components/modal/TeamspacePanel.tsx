import styled from 'styled-components';
import { TeamspaceDescription } from '../../constants';
import { FlexColumn } from '../../styles/themes';

export interface TeamspacePanelProps {
  teamspace: TeamspaceDescription;
}

export default function TeamspacePanel({ teamspace: { title } }: TeamspacePanelProps) {
  return (
    <Wrapper>
      <TitleText>{title}</TitleText>
      <button>들어가기</button>
    </Wrapper>
  );
}

const Wrapper = styled(FlexColumn)`
  box-sizing: border-box;
  padding: 0 10px;
  width: 100px;
  height: 100px;

  border: 1px solid black;
  justify-content: center;
  align-items: center;
  gap: 0.5em;
`;

const TitleText = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-align: center;
  width: 100%;
`;
