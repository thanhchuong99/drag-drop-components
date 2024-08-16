import { Box } from '@mui/material';
import { FC, useCallback, useMemo } from 'react';
import { ComponentType } from 'src/types';

interface ItemsInterfaceProps {
  handleDragging: (dragging: boolean) => void;
}

export const ItemsInterface: FC<ItemsInterfaceProps> = ({ handleDragging }) => {
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, type: ComponentType) => {
      e.dataTransfer.setData('text', `${type}`);
      handleDragging(true);
    },
    [handleDragging],
  );

  const handleDragEnd = useCallback(
    () => handleDragging(false),
    [handleDragging],
  );

  const componentItems = useMemo(
    () =>
      Object.values(ComponentType).map(type => (
        <Box
          key={type}
          className="flex items-center justify-center flex-col"
          draggable
          onDragStart={e => handleDragStart(e, type)}
          onDragEnd={handleDragEnd}
        >
          {type}
        </Box>
      )),
    [handleDragStart, handleDragEnd],
  );

  return <Box className="flex flex-col gap-4">{componentItems}</Box>;
};
