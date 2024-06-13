import { Block } from '../constants';

const SERVER = import.meta.env.VITE_SERVER;

const UNKNOWN_ERROR_MESSAGE = '알 수 없는 에러가 발생하였습니다.';

export const sendArticleRequestById = async (id: number) => {
  try {
    const response = await fetch(`${SERVER}/api/article/${id}`);

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateArticleRequestById = async (id: number, blocks: Block[]) => {
  try {
    const response = await fetch(`${SERVER}/api/article/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: blocks }),
    });

    if (!response.ok) throw new Error(UNKNOWN_ERROR_MESSAGE);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
