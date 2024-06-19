import styled from 'styled-components';
import themes, { PopupWrapper, PopupLineWrapper, PopupLine } from '../../styles/themes';
import { CommentOutlined, StarFilled, DeleteOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';

const { BackgroudColor } = themes.Color;

export default function EditPopup() {
  return (
    <EditPopupWrapper>
      <PopupLineWrapper>
        <PopupLine>
          <div>
            <CommentOutlined />
            <span className="optionTitle">댓글</span>
          </div>
          <div className="optionShortCutKey">Ctrl+Shift+M</div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div>
            <StarFilled />
            <span className="optionTitle">AI에게 요청</span>
          </div>
          <div className="optionShortCutKey">Ctrl+J</div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div className="deleteTitle">
            <DeleteOutlined />
            <span className="optionTitle">삭제</span>
          </div>
          <div className="optionShortCutKey">Del</div>
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <div>
            <RetweetOutlined />
            <span className="optionTitle">전환</span>
          </div>
          <div className="optionShortCutKey">
            <RightOutlined />
          </div>
        </PopupLine>
      </PopupLineWrapper>
    </EditPopupWrapper>
  );
}
const EditPopupWrapper = styled(PopupWrapper)`
  position: absolute;
  left: 20px;
  top: 0px;
  background-color: ${BackgroudColor};
  z-index: 1;
`;
