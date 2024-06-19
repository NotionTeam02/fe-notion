import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons';
import { FlexColumn, FlexRow, PopupLine, PopupLineWrapper, PopupWrapper } from '../../styles/themes';
import { themes } from '../../styles/themes';
import pragraphImg from '../../assets/images/sub_pragraph.png';
import header1Img from '../../assets/images/sub_header1.png';
import header2Img from '../../assets/images/sub_header2.png';
import header3Img from '../../assets/images/sub_header3.png';
import unOrderListImg from '../../assets/images/sub_unorder_list.png';
import orderListImg from '../../assets/images/sub_order_list.png';
import codeImg from '../../assets/images/sub_code.png';
import quoteImg from '../../assets/images/sub_quote.png';

const { BackgroudColor, WeakColor } = themes.Color;

export default function SubPopup() {
  return (
    <SubPopupWrapper>
      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={pragraphImg} />
            <Item className="optionTitle">텍스트</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={header1Img} />
            <Item className="optionTitle">제목1</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={header2Img} />
            <Item className="optionTitle">제목2</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={header3Img} />
            <Item className="optionTitle">제목3</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={unOrderListImg} />
            <Item className="optionTitle">글머리 기호 목록</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={orderListImg} />
            <Item className="optionTitle">번호 매기기 목록</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={codeImg} />
            <Item className="optionTitle">코드</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>

      <PopupLineWrapper>
        <PopupLine>
          <FlexRow>
            <StyledImg src={quoteImg} />
            <Item className="optionTitle">인용</Item>
          </FlexRow>
          <CheckOutlined />
        </PopupLine>
      </PopupLineWrapper>
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
