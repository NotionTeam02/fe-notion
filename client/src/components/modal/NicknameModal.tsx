import styled from 'styled-components';
import { themes, FlexColumn, BoxBorder, ButtonBorder } from '../../styles/themes';

export default function NicknameModal() {
  return (
    <Wrapper>
      <span>로그인</span>
      <NicknameInput type="text" placeholder="닉네임" />
      <SubmitButton>확인</SubmitButton>
      <RegistrationButton>회원가입</RegistrationButton>
    </Wrapper>
  );
}
const {
  Color: { BoxBackground, SubmitColor },
} = themes;

const Wrapper = styled(FlexColumn)`
  width: 300px;
  height: 174px;
  border: 1px solid #e2e5e8;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;

const NicknameInput = styled.input`
  ${BoxBorder}

  background-color: ${BoxBackground};
  width: 200px;
  height: 30px;
  padding: 0 1rem;

  &:focus {
    outline: none;
  }
`;

const SubmitButton = styled.button`
  ${ButtonBorder}
  background-color: ${BoxBackground};
  color: ${SubmitColor};
  border: 1px solid blue;
  opacity: 0.4;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const RegistrationButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    color: blue;
    text-decoration: underline;
  }
`;
