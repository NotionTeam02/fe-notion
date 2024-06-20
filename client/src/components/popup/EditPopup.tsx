import styled from 'styled-components';
import themes, { PopupWrapper, PopupLineWrapper, PopupLine } from '../../styles/themes';
import { CommentOutlined, StarFilled, DeleteOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';

const { BackgroudColor } = themes.Color;
interface EditPopupContent {
  icon: React.ReactNode;
  optionShortCutKey: React.ReactNode | string;
  optionTitle: string;
  className?: string;
}
const editPopupContents: { [key: string]: EditPopupContent } = {
  paragraph: { icon: <CommentOutlined />, optionShortCutKey: 'Ctrl+Shift+M', optionTitle: '댓글' },
  Header1: { icon: <StarFilled />, optionShortCutKey: 'Ctrl+J', optionTitle: 'AI에게 요청' },
  Header2: { icon: <DeleteOutlined />, optionShortCutKey: 'Del', optionTitle: '삭제', className: 'deleteTitle' },
  Header3: { icon: <RetweetOutlined />, optionShortCutKey: <RightOutlined />, optionTitle: '전환' },
};

export default function EditPopup() {
  return (
    <EditPopupWrapper>
      {Object.keys(editPopupContents).map((key) => {
        const { icon, optionShortCutKey, optionTitle, className } = editPopupContents[key];
        return (
          <PopupLineWrapper key={key}>
            <PopupLine>
              <div className={className || ''}>
                {icon}
                <span className="optionTitle">{optionTitle}</span>
              </div>
              <div className="optionShortCutKey">{optionShortCutKey}</div>
            </PopupLine>
          </PopupLineWrapper>
        );
      })}
    </EditPopupWrapper>
  );
}

const EditPopupWrapper = styled(PopupWrapper)`
  position: absolute;
  top: 0px;
  background-color: ${BackgroudColor};
  z-index: 1;
`;
