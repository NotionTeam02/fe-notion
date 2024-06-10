import { BlockControllerProps } from '../constants';
import EditableBlock from './EditableBlock';
import useBlockController from '../hooks/useBlockController';
import { ColumnGap } from '../styles/themes';
import { useState } from 'react';

export default function BlockController(props: BlockControllerProps) {
  const { blocks } = props;
  const { handleInput } = useBlockController(props);
  const showPopup = () => {};
  const [cursorPosition, setCursorPosition] = useState<{ node: Node | null; offset: number; blockOffset: number }>({
    node: null,
    offset: 0,
    blockOffset: 0,
  });

  return (
    <ColumnGap>
      {blocks.map((block, index) => (
        <div key={index}>
          <EditableBlock
            block={block}
            index={index}
            handleInput={handleInput}
            showPopup={showPopup}
            cursorPosition={cursorPosition}
            setCursorPosition={setCursorPosition}
            isFocusedBlock={index === cursorPosition.blockOffset}
          />
        </div>
      ))}
    </ColumnGap>
  );
}
