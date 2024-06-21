import { Block, BlockControllerProps, ParagraphBlock } from '../constants';
import { HandleInputProps } from '../components/article/EditableBlock';
import { generateRange } from '../helpers/cursorHelpers';
import { useCursorStore } from '../stores/useCursorStore';
import { useEffect, useRef } from 'react';
import { handleBackspace } from '@/helpers/keyEventHelpers';
import useKeyEvent from './useKeyEvent';

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

const isEmptyContent = (text: string | null) => text === '';

export const removeBlock = (blocks: Block[], blockIndex: number) => {
  const previousArr = blocks.slice(0, blockIndex);
  const nextArr = blocks.slice(blockIndex + 1);
  const removedArray = [...previousArr, ...nextArr];

  return removedArray;
};

export default function useBlockController({ clientBlockRef, blocks, setBlocks, handleFetch }: BlockControllerProps) {
  const { blockOffset, setBlockOffset, textOffset, setTextOffset } = useCursorStore();
  const blockControllerRef = useRef<HTMLDivElement | null>(null);
  const { handleInput } = useKeyEvent({ blocks, setBlocks, clientBlockRef, handleFetch });

  useEffect(() => {
    const blockNodes = blockControllerRef.current?.querySelectorAll('[contenteditable="true"]');

    if (!blockNodes || blockNodes.length === 0) return;

    const selection = window.getSelection();
    if (!selection) return;

    const newNode = [...blockNodes][blockOffset];
    if (!newNode) return;

    const nodeLength = newNode.textContent?.length || 0;
    const newOffset = Math.min(textOffset, nodeLength);

    if (newOffset < 0 || newOffset > nodeLength) return;

    if (newNode.childNodes.length > 0) {
      selection.setPosition(newNode.childNodes[0], newOffset);
    } else {
      selection.setPosition(newNode, newOffset);
    }
  }, [blocks]);

  return { blockControllerRef, handleInput };
}
