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
import { CursorPosition } from '../hooks/useBlockController';
import { specifyPositionOfCursor } from '../helpers/specifyPositionOfCursor';

export interface HandleInputProps {
  e: React.KeyboardEvent<HTMLElement>;
  index: number;
  itemIndex?: number;
  cursorPositionRef?: React.RefObject<{ node: Node | null; offset: number; blockOffset: number }>;
  updateCursorPosition?: (positionObj: CursorPosition) => void;
}

export interface EditableBlockProps {
  block: Block;
  index: number;
  handleInput: (props: HandleInputProps) => void;
  showPopup?: () => void;
  cursorPositionRef: React.RefObject<{ node: Node | null; offset: number; blockOffset: number }>;
  updateCursorPosition: (positionObj: CursorPosition) => void;
  isFocusedBlock: boolean;
}

export interface OrderedItemTagProps {
  item: OrderedItemBlock;
  itemIndex: number;
  index: number;
  handleInput: (props: HandleInputProps) => void;
}

const stopEnterDefaultEvent = (e: React.KeyboardEvent<HTMLElement>) => {
  if (e.key === 'Enter') e.preventDefault();
};

const HeaderTag = ({ block: { level, content }, index, handleInput }: EditableBlockProps & { block: HeaderBlock }) => {
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
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
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
  cursorPositionRef,
  updateCursorPosition,
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
      onKeyUp={(e) =>
        handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, cursorPositionRef, updateCursorPosition })
      }
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
        onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
        onKeyDown={(e) => stopEnterDefaultEvent(e)}
      >
        {content}
      </div>
    </Flex>
  </BlockWrapper>
);

const OrderedListTag = ({ block: { items }, index, handleInput }: EditableBlockProps & { block: OrderedListBlock }) => (
  <ColumnGap>
    {items.map((item: OrderedItemBlock, itemIndex: number) => (
      <div key={`ol-wrapper-${index}-${itemIndex}`}>
        <OrderedItemTag item={item} itemIndex={itemIndex} index={index} handleInput={handleInput} />
      </div>
    ))}
  </ColumnGap>
);

const OrderedItemTag = ({ item, itemIndex, index, handleInput }: OrderedItemTagProps) => {
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
          onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index, itemIndex })}
          onKeyDown={(e) => stopEnterDefaultEvent(e)}
        >
          {item.content}
        </div>
      </Flex>
    </BlockWrapper>
  );
};

const ImageTag = ({ block: { url, alt }, index, handleInput }: EditableBlockProps & { block: ImageBlock }) => (
  <div>
    <img src={url} alt={alt} />
    <p
      contentEditable
      suppressContentEditableWarning
      onKeyUp={(e) => handleInput({ e: e as React.KeyboardEvent<HTMLElement>, index })}
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
  cursorPositionRef,
  updateCursorPosition,
  isFocusedBlock,
}: EditableBlockProps) {
  useEffect(() => {
    specifyPositionOfCursor({ cursorPositionRef, isFocusedBlock });
  }, [block]);

  const { type } = block;
  const blockTag = {
    header: (
      <HeaderTag
        block={block as HeaderBlock}
        index={index}
        handleInput={handleInput}
        isFocusedBlock={isFocusedBlock}
        cursorPositionRef={cursorPositionRef}
        updateCursorPosition={updateCursorPosition}
      />
    ),
    paragraph: (
      <ParagraphTag
        block={block as ParagraphBlock}
        index={index}
        handleInput={handleInput}
        isFocusedBlock={isFocusedBlock}
        cursorPositionRef={cursorPositionRef}
        updateCursorPosition={updateCursorPosition}
      />
    ),
    'ul-item': (
      <UnorderedItemTag
        block={block as UnorderedItemBlock}
        index={index}
        handleInput={handleInput}
        isFocusedBlock={isFocusedBlock}
        cursorPositionRef={cursorPositionRef}
        updateCursorPosition={updateCursorPosition}
      />
    ),
    'ordered-list': (
      <OrderedListTag
        block={block as OrderedListBlock}
        index={index}
        handleInput={handleInput}
        isFocusedBlock={isFocusedBlock}
        cursorPositionRef={cursorPositionRef}
        updateCursorPosition={updateCursorPosition}
      />
    ),
    image: (
      <ImageTag
        block={block as ImageBlock}
        index={index}
        handleInput={handleInput}
        isFocusedBlock={isFocusedBlock}
        cursorPositionRef={cursorPositionRef}
        updateCursorPosition={updateCursorPosition}
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
