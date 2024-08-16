import { Box } from '@mui/material';
import { FC } from 'react';
import { ComponentInfo, ComponentType } from 'src/types';
import { cn } from 'src/utils';

const ComponentRender = {
  [ComponentType.Button]: (item: ComponentInfo) => (
    <button className="bg-blue-500 text-white p-2 rounded-md">
      {item.text || 'Button'}
    </button>
  ),
  [ComponentType.Paragraph]: (item: ComponentInfo) => (
    <p className="text-gray-500">{item.text || 'Paragraph'}</p>
  ),
};

interface ComponentPlaygroundProps {
  listItems: ComponentInfo[];
  isDragging: boolean;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  setSelectedEditItem: (item: ComponentInfo) => void;
}
export const ComponentPlayground: FC<ComponentPlaygroundProps> = ({
  listItems,
  isDragging,
  handleDrop,
  handleDragOver,
  setSelectedEditItem,
}) => {
  const handleClick = (item: ComponentInfo) => {
    setSelectedEditItem(item);
  };

  return (
    <Box
      className={cn(
        `flex flex-col items-center gap-4 h-[70%] overflow-y-auto p-4 ${
          isDragging ? 'bg-yellow-50' : ''
        }`,
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={e => {
        const target = e.target as HTMLElement;
        if (!target.dataset.itemId) {
          return;
        }
        const itemId = target.dataset.itemId;
        const selectedItem = listItems.find(item => item.id === itemId);

        if (selectedItem) {
          handleClick(selectedItem);
        }
      }}
    >
      {listItems.map(item => (
        <Box
          key={item.id}
          data-item-id={item.id}
          onClick={() => handleClick(item)}
        >
          {ComponentRender[item.type](item)}
        </Box>
      ))}
    </Box>
  );
};
