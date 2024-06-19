import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { FlexRow } from '../../styles/themes';
import AddPopup from '../popup/AddPopup';
import EditPopup from '../popup/EditPopup';

export default function BlockTag({ contentTag }: { contentTag: ReactNode }) {
  const [isShowSubPopup, setIsShowSubPopup] = useState({ edit: false, plus: false });

  const showEditPopup = () => setIsShowSubPopup((prev) => ({ ...prev, edit: !prev.edit }));
  const showPlusPopup = () => setIsShowSubPopup((prev) => ({ ...prev, plus: !prev.plus }));

  const popupType: { [key: string]: () => void } = {
    edit: () => {
      showEditPopup();
    },
    plus: () => {
      showPlusPopup();
    },
  };

  type PopupTypeKey = keyof typeof popupType;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLElement;
    const type = target.getAttribute('attr-type');
    if (!type || !(type in popupType)) return;
    popupType[type as PopupTypeKey]();
  };

  return (
    <>
      <BlockWrapper>
        <Icons>
          <IconWrapper attr-type="edit" onClick={handleClick}>
            <HolderOutlined />
          </IconWrapper>
          <IconWrapper attr-type="plus" onClick={handleClick}>
            <PlusOutlined />
          </IconWrapper>
        </Icons>
        {contentTag}
      </BlockWrapper>
      {isShowSubPopup.plus && <AddPopup />}
      {isShowSubPopup.edit && <EditPopup />}
    </>
  );
}

const BlockWrapper = styled(FlexRow)`
  justify-content: flex-start;
`;

const Icons = styled(FlexRow)`
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  transition: all;
  position: relative;
`;

const IconWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
  ${Icons}:hover & {
    opacity: 1;
  }
`;
