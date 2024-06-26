import { useCallback, useEffect, useRef } from 'react';
import { Block } from '../constants';
import { sendArticleRequestById } from '../api/articleAPI';
import { io } from 'socket.io-client';
import { debounce } from '../utils/timeoutUtils';
import { useParams } from 'react-router-dom';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useUpdateArticleMutation } from './mutationHooks';

const SERVER = import.meta.env.VITE_SERVER;

export default function useArticle() {
  const clientBlocksRef = useRef<Block[]>([]);
  const { teamspaceId, articleId } = useParams();
  const client = useQueryClient();

  const { data: blocks = [] } = useSuspenseQuery<Block[]>({
    queryKey: ['article', `${articleId}`],
    queryFn: async () => {
      const response = await sendArticleRequestById({ teamspaceId, articleId });
      const { content } = response;
      clientBlocksRef.current = content;

      return content;
    },
    refetchOnWindowFocus: false,
  });

  const successFn = () => {};

  const { updateArticle } = useUpdateArticleMutation({ successFn });

  useEffect(() => {
    const socket = io(SERVER);

    socket.on(`article-${articleId}`, ({ content }) => client.setQueryData(['article', `${articleId}`], content));

    return () => {
      socket.off(`article-${articleId}`);
    };
  }, [teamspaceId, articleId]);

  const debouncedFetch = useCallback(
    debounce((updatedBlocks: Block[]) => {
      updateArticle({
        teamspaceId,
        articleId,
        blocks: updatedBlocks,
      });
    }, 1000),
    [teamspaceId, articleId]
  );

  return {
    clientBlocksRef,
    blocks,
    setBlocks: (newBlocks: Block[]) => (clientBlocksRef.current = newBlocks),
    debouncedFetch,
  };
}
