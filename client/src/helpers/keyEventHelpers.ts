import { Block } from '@/constants';
import { removeBlock } from '@/hooks/useKeyEvent';
import { MutableRefObject } from 'react';

const isEmptyContent = (text: string | null) => text === '';

type HandleBackspaceProps = {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  setBlockOffset: (blockOffset: number) => void;
  setTextOffset: (textOffset: number) => void;
  clientBlockRef: MutableRefObject<Block[]>;
  handleFetch: (blocks: Block[], option?: boolean | undefined) => void;
  textContent: string | null;
  blockIndex: number;
};

export const handleBackspace = ({
  blocks,
  setBlocks,
  setBlockOffset,
  setTextOffset,
  clientBlockRef,
  handleFetch,
  textContent,
  blockIndex,
}: HandleBackspaceProps) => {
  if (!isEmptyContent(textContent)) return;

  const newBlockIndex = blockIndex < 1 ? 0 : blockIndex - 1;
  const newBlocks = removeBlock(blocks, blockIndex);
  setBlocks(newBlocks);
  setBlockOffset(newBlockIndex);
  setTextOffset(Infinity);
  clientBlockRef.current = newBlocks;
  handleFetch(newBlocks, true);
};
