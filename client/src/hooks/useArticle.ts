import { useCallback, useEffect, useRef, useState } from 'react';
import { Block } from '../constants';
import { sendArticleRequestById, updateArticleRequestById } from '../api/fetchArticle';
import { debounce } from 'lodash';

const FIRST_PAGE = 1;

export default function useArticle() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const clientBlocksRef = useRef<Block[]>([]);

  useEffect(() => {
    sendArticleRequestById(FIRST_PAGE).then(({ content }) => {
      setBlocks(content);
    });
  }, []);

  useEffect(() => {
    clientBlocksRef.current = blocks;
  }, [blocks]);

  const debouncedFetch = useCallback(
    debounce((updatedBlocks: Block[]) => {
      updateArticleRequestById(FIRST_PAGE, updatedBlocks).then(({ content }) => {
        setBlocks(content);
      });
    }, 1000),
    []
  );

  const handleContentChange = (updatedBlock: Block, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    clientBlocksRef.current[index] = updatedBlock;
    setBlocks(clientBlocksRef.current);
    debouncedFetch(clientBlocksRef.current);
  };
  return {
    blocks,
    setBlocks,
    debouncedFetch,
    handleContentChange,
  };
}