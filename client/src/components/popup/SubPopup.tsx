import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons';
import { FlexColumn, FlexRow, PopupLine, PopupLineWrapper, PopupWrapper } from '../../styles/themes';
import { themes } from '../../styles/themes';
import { subPopupContents } from './AddPopup';

const { BackgroudColor, WeakColor } = themes.Color;

export default function SubPopup() {
  return (
    <SubPopupWrapper>
      {subPopupContents.map((content) => {
        const key = Object.keys(content)[0];
        const { img, optionTitle } = content[key];

        return (
          <PopupLineWrapper>
            <PopupLine>
              <FlexRow>
                <StyledImg src={img} />
                <Item className="optionTitle">{optionTitle}</Item>
              </FlexRow>
              <CheckOutlined />
            </PopupLine>
          </PopupLineWrapper>
        );
      })}
    </SubPopupWrapper>
  );
}

const Item = styled(FlexColumn)`
  justify-content: center;
  height: 100%;
`;
const SubPopupWrapper = styled(PopupWrapper)`
  width: 250px;
`;
const StyledImg = styled.img`
  display: block;
  object-fit: cover;
  border-radius: 4px;
  background: ${BackgroudColor};
  width: 23px;
  height: 23px;
  border: 1px solid ${WeakColor};
`;
