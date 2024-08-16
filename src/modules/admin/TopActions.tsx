import { Box, Button, ButtonGroup } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  saveItems: () => void;
}

export const TopActions = ({ saveItems }: Props) => {
  return (
    <Box className="flex justify-end">
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button>
          <Link to="/consumers" target="_blank" rel="noopener noreferrer">
            View
          </Link>
        </Button>
        <Button onClick={saveItems}>Save</Button>
      </ButtonGroup>
    </Box>
  );
};
