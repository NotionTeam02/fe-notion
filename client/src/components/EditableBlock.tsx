import styled from 'styled-components';
import {
  Block,
  HeaderBlock,
  ImageBlock,
  UnorderedItemBlock,
  OrderedItemBlock,
  ParagraphBlock,
  OrderedListBlock,
} from '../constants';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { ColumnGap, Flex, FlexRow } from '../styles/themes';
import React, { useEffect } from 'react';

export interface HandleInputProps {
  e: React.KeyboardEvent<HTMLElement>;
  index: number;
  itemIndex?: number;
  setCursorPosition?: React.Dispatch<React.SetStateAction<{ node: Node | null; offset: number; blockOffset: number }>>;
}

export interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (props: HandleInputProps) => void;
  showPopup?: () => void;
  cursorPosition: { node: Node | null; offset: number; blockOffset: number };
  setCursorPosition: React.Dispatch<React.SetStateAction<{ node: Node | null; offset: number; blockOffset: number }>>;
  isFocusedBlock: boolean;
}

export interface OrderedItemTagProps {
  item: OrderedItemBlock;
  itemIndex: number;
  index: number;
  handleInput: (props: HandleInputProps) => void;
  setCursorPosition: React.Dispatch<React.SetStateAction<{ node: Node | null; offset: number; blockOffset: number }>>;
}

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const HeaderTag = ({
  block: { level, content },
  index,
  handleInput,
  setCursorPosition,
}: EditableBlockProps & { block: HeaderBlock }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <BlockWrapper>
      <Icons>
        <IconWrapper>
          <HolderOutlined />
        </IconWrapper>
        <IconWrapper>
          <PlusOutlined />
        </IconWrapper>
      </Icons>
      <Tag
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, setCursorPosition })}
        onKeyDown={(e) => stopEnterDefaultEvent(e as React.KeyboardEvent<HTMLElement>)}
      >
        {content}
      </Tag>
    </BlockWrapper>
  );
};

const ParagraphTag = ({
  block: { content },
  index,
  handleInput,
  cursorPosition,
  setCursorPosition,
}: EditableBlockProps & { block: ParagraphBlock }) => (
  <BlockWrapper>
    <Icons>
      <IconWrapper>
        <HolderOutlined />
      </IconWrapper>
      <IconWrapper>
        <PlusOutlined />
      </IconWrapper>
    </Icons>
    <StyledBlockTag
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, setCursorPosition })}
      onKeyDown={stopEnterDefaultEvent}
      style={{ backgroundColor: 'aliceblue' }}
    >
      {content}
    </StyledBlockTag>
  </BlockWrapper>
);

const UnorderedItemTag = ({
  block: { content },
  index,
  handleInput,
  cursorPosition,
  setCursorPosition,
}: EditableBlockProps & { block: UnorderedItemBlock }) => (
  <BlockWrapper>
    <Icons>
      <IconWrapper>
        <HolderOutlined />
      </IconWrapper>
      <IconWrapper>
        <PlusOutlined />
      </IconWrapper>
    </Icons>
    <Flex>
      <OrderedListIndex>•</OrderedListIndex>
      <div
        contentEditable
        suppressContentEditableWarning
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, setCursorPosition })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
      >
        {content}
      </div>
    </Flex>
  </BlockWrapper>
);

const OrderedListTag = ({
  block: { items },
  index,
  handleInput,
  cursorPosition,
  setCursorPosition,
}: EditableBlockProps & { block: OrderedListBlock }) => (
  <ColumnGap>
    {items.map((item: OrderedItemBlock, itemIndex: number) => (
      <div key={`ol-wrapper-${index}-${itemIndex}`}>
        <OrderedItemTag
          item={item}
          itemIndex={itemIndex}
          index={index}
          handleInput={handleInput}
          setCursorPosition={setCursorPosition}
        />
      </div>
    ))}
  </ColumnGap>
);

const OrderedItemTag = ({ item, itemIndex, index, handleInput, setCursorPosition }: OrderedItemTagProps) => {
  return (
    <BlockWrapper>
      <Icons>
        <IconWrapper>
          <HolderOutlined />
        </IconWrapper>
        <IconWrapper>
          <PlusOutlined />
        </IconWrapper>
      </Icons>
      <Flex>
        <OrderedListIndex>{`${itemIndex + 1}.`}</OrderedListIndex>
        <div
          key={`ol-${index}-${itemIndex}`}
          contentEditable
          suppressContentEditableWarning
          onKeyUp={(e) =>
            handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, itemIndex, setCursorPosition })
          }
          onKeyDown={(e) => stopEnterDefaultEvent(e)}
        >
          {item.content}
        </div>
      </Flex>
    </BlockWrapper>
  );
};

const ImageTag = ({
  block: { url, alt },
  index,
  handleInput,
  setCursorPosition,
}: EditableBlockProps & { block: ImageBlock }) => (
  <div>
    <img src={url} alt={alt} />
    <p
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, setCursorPosition })}
    >
      {alt}
    </p>
  </div>
);

export default function EditableBlock({
  block,
  index,
  handleInput,
  showPopup,
  cursorPosition,
  setCursorPosition,
  isFocusedBlock,
}: EditableBlockProps) {
  useEffect(() => {
    const nodeOfCursor = cursorPosition.node;
    if (isFocusedBlock && nodeOfCursor) {
      const selection = window.getSelection();
      const range = document.createRange();
      const nodeLength = nodeOfCursor.textContent?.length || 0;
      const offset = Math.min(cursorPosition.offset, nodeLength);
      // cursorPosition.offset : 저장된 커서 위치
      range.setStart(nodeOfCursor, offset);
      range.setEnd(nodeOfCursor, offset);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, [block]);

  const { type } = block;
  const blockTag = {
    header: (
      <HeaderTag
        block={block as HeaderBlock}
        index={index}
        handleInput={handleInput}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        isFocusedBlock={isFocusedBlock}
      />
    ),
    paragraph: (
      <ParagraphTag
        block={block as ParagraphBlock}
        index={index}
        handleInput={handleInput}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        isFocusedBlock={isFocusedBlock}
      />
    ),
    'ul-item': (
      <UnorderedItemTag
        block={block as UnorderedItemBlock}
        index={index}
        handleInput={handleInput}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        isFocusedBlock={isFocusedBlock}
      />
    ),
    'ordered-list': (
      <OrderedListTag
        block={block as OrderedListBlock}
        index={index}
        handleInput={handleInput}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        isFocusedBlock={isFocusedBlock}
      />
    ),
    image: (
      <ImageTag
        block={block as ImageBlock}
        index={index}
        handleInput={handleInput}
        cursorPosition={cursorPosition}
        setCursorPosition={setCursorPosition}
        isFocusedBlock={isFocusedBlock}
      />
    ),
  };

  return <>{blockTag[type]}</>;
}

const BlockWrapper = styled(FlexRow)`
  justify-content: flex-start;
`;

const Icons = styled(FlexRow)`
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  transition: all;
`;
const IconWrapper = styled.div`
  opacity: 0;
  transition: opacity 0.3s;
  ${Icons}:hover & {
    opacity: 1;
  }
`;

const OrderedListIndex = styled.span`
  padding: 0 6px;
`;

const StyledBlockTag = styled.div`
  white-space: pre-wrap; /* 줄 바꿈과 공백을 그대로 렌더링 */
  word-break: break-word;
`;
