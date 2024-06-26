import { HandleInputProps } from '@/components/article/EditableBlock';
import { Block, ParagraphBlock } from '@/constants';
import { generateRange } from '@/helpers/cursorHelpers';
import { handleBackspace } from '@/helpers/keyEventHelpers';
import { useCursorStore } from '@/stores/useCursorStore';
import { MutableRefObject } from 'react';

interface KeyEventHookProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  clientBlockRef: MutableRefObject<Block[]>;
  handleFetch: (blocks: Block[], option?: boolean) => void;
}

const insertLineBreak = (blocks: Block[], blockIndex: number, offset: number = 0): Block[] => {
  const block = blocks[blockIndex];
  if (block.type === 'paragraph') {
    const previousArr = blocks.slice(0, blockIndex);
    const nextArr = blocks.slice(blockIndex + 1);

    const prevContent = block.content.slice(0, offset);
    const nextContent = block.content.slice(offset);
    const breakLine = nextContent ? '\n' : '\n\n';
    const lineBreakContent = `${prevContent}${breakLine}${nextContent}`;

    const array = [...previousArr, { type: 'paragraph', content: lineBreakContent } as ParagraphBlock, ...nextArr];
    return array;
  }
  return [];
};

const addNewBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex + 1);
  const nextArr = blocks.slice(blockIndex + 1);
  const array = [...previousArr, { type: 'paragraph', content: '' } as ParagraphBlock, ...nextArr];

  return array;
};

export const removeBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex);
  const nextArr = blocks.slice(blockIndex + 1);
  const removedArray = [...previousArr, ...nextArr];

  if (removedArray.length === 0) return blocks;

  return removedArray;
};

export default function useKeyEvent({ blocks, setBlocks, clientBlockRef, handleFetch }: KeyEventHookProps) {
  const { setBlockOffset, setTextOffset } = useCursorStore();

  const handleInput = ({
    e: {
      key,
      shiftKey,
      currentTarget: { textContent },
    },
    index: blockIndex,
    itemIndex,
  }: HandleInputProps) => {
    let newBlocks = [...blocks];
    const block = newBlocks[blockIndex];
    const newOffset = generateRange()?.startOffset || 0;

    if (key === 'Backspace') {
      const handleBackspaceProps = {
        blocks,
        setBlocks,
        setBlockOffset,
        setTextOffset,
        clientBlockRef,
        handleFetch,
        textContent,
        blockIndex,
      };
      handleBackspace(handleBackspaceProps);
      return;
    }

    if (key === 'Enter') {
      const newTextOffset = shiftKey ? newOffset + 1 : 0;
      const newBlockOffset = shiftKey ? blockIndex : blockIndex + 1;

      newBlocks = shiftKey
        ? insertLineBreak(clientBlockRef.current, blockIndex, newOffset)
        : addNewBlock(clientBlockRef.current, blockIndex);

      clientBlockRef.current = newBlocks;
      setBlockOffset(newBlockOffset);
      setTextOffset(newTextOffset);
      handleFetch(newBlocks, true);
      return;
    }

    if ((itemIndex === undefined || itemIndex < 0) && 'content' in block) {
      newBlocks[blockIndex] = { ...block, content: textContent || '' } as typeof block;
    }

    if ('items' in block && block.items.length > 0) {
      const updatedItems = block.items.map((item, idx) =>
        idx === itemIndex ? { type: 'ol-item', content: textContent } : item
      );
      newBlocks[blockIndex] = { ...block, items: updatedItems } as typeof block;
    }

    clientBlockRef.current = newBlocks;
    setBlockOffset(blockIndex);
    setTextOffset(newOffset);
    handleFetch(newBlocks);
  };

  return { handleInput };
}
