import { Box, Button, ButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  saveItems: () => void;
}

export const TopActions = ({ saveItems }: Props) => {
  const navigate = useNavigate();
  return (
    <Box className="flex justify-end">
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={saveItems}>Save</Button>
        <Button onClick={() => navigate('/consumers')}>Save</Button>
      </ButtonGroup>
    </Box>
  );
};
