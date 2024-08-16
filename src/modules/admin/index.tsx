import { Box, Grid, GridOwnProps, Stack } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { useDragAndDrop } from 'src/hooks/useDragnDrop';
import { ComponentPlayground } from './ComponentPlayground';
import { SetComponentInfo } from './SetComponentInfo';
import { TopActions } from './TopActions';
import { ItemsInterface } from './ItemsInterface';

interface StyledGridItemProps extends PropsWithChildren, GridOwnProps {
  gridArea?: string;
}
const StyledGridItem: FC<StyledGridItemProps> = ({ children, ...props }) => {
  return (
    <Box
      className="border-2 border-solid p-4"
      {...props}
      sx={{ borderCollapse: 'separate' }}
    >
      {children}
    </Box>
  );
};

export const Admin: FC = () => {
  const {
    isDragging,
    listItems,
    selectedEditItem,
    handleDragging,
    handleDragOver,
    handleDrop,
    setSelectedEditItem,
    handleUpdateItem,
    saveItems,
  } = useDragAndDrop();

  return (
    <Box className="w-screen h-screen overflow-hidden">
      <Box component="main" className="flex flex-col h-full">
        <StyledGridItem height="10%">
          {listItems.length ? <TopActions saveItems={saveItems} /> : null}
        </StyledGridItem>
        <Stack direction="row" height="90%" className="flex-row">
          <StyledGridItem width="20%">
            <ItemsInterface handleDragging={handleDragging} />
          </StyledGridItem>
          <Box flexGrow="1">
            <ComponentPlayground
              listItems={listItems}
              isDragging={isDragging}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              setSelectedEditItem={setSelectedEditItem}
            />
            <StyledGridItem height="30%">
              <SetComponentInfo
                selectedEditItem={selectedEditItem}
                setSelectedEditItem={setSelectedEditItem}
                handleUpdateItem={handleUpdateItem}
              />
            </StyledGridItem>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
