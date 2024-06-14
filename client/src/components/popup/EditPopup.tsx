import React from 'react';
import themes, { FlexColumn, FlexRow } from '../../styles/themes';
import styled from 'styled-components';
import { CommentOutlined, StarFilled, DeleteOutlined, RetweetOutlined, RightOutlined } from '@ant-design/icons';

const {
  Color: { DefaultColor },
} = themes;

export default function EditPopup() {
  return (
    <PopupWrapper>
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
          <div>
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
    </PopupWrapper>
  );
}

const PopupLineWrapper = styled.div`
  padding: 8px;
  border-bottom: 2px solid ${DefaultColor};
  overflow: hidden;
  &:last-child {
    border-bottom: none;
  }
`;

const PopupLine = styled(FlexRow)`
  align-items: end;

  & .optionTitle {
    margin-left: 10px;
  }
  & .optionShortCutKey {
    color: ${themes.Color.WeakColor};
  }
`;

const PopupWrapper = styled(FlexColumn)`
  border: 2px solid ${themes.Color.DefaultColor};
  border-radius: 10px;
  width: 300px;

  ${PopupLineWrapper}:hover {
    background-color: grey;
  }
`;
