import { Box, Button, TextField } from '@mui/material';
import { ComponentInfo } from 'src/types';

interface Props {
  selectedEditItem: ComponentInfo | undefined;
  setSelectedEditItem: React.Dispatch<
    React.SetStateAction<ComponentInfo | undefined>
  >;
  handleUpdateItem: (component: ComponentInfo) => void;
}
export const SetComponentInfo = ({
  selectedEditItem,
  setSelectedEditItem,
  handleUpdateItem,
}: Props) => {
  return (
    <div>
      {selectedEditItem && (
        <div>
          <div>Component Info</div>
          <div className="flex flex-col gap-2 mt-2">
            <TextField
              label="Text"
              variant="outlined"
              value={selectedEditItem.text}
              onChange={e =>
                setSelectedEditItem({
                  ...selectedEditItem,
                  text: e.target.value,
                })
              }
            />

            {selectedEditItem?.config?.map((config, index) => (
              <TextField
                key={index}
                label={config.label}
                value={config.value}
                onChange={e =>
                  setSelectedEditItem({
                    ...selectedEditItem,
                    config: [
                      ...selectedEditItem.config!.slice(0, index),
                      {
                        ...config,
                        value: e.target.value,
                      },
                      ...selectedEditItem.config!.slice(index + 1),
                    ],
                  })
                }
              />
            ))}
            <Box className="flex justify-end gap-2">
              <Button
                variant="contained"
                onClick={() => handleUpdateItem(selectedEditItem)}
              >
                Save
              </Button>
              <Button
                variant="contained"
                onClick={() => setSelectedEditItem(undefined)}
              >
                Close
              </Button>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};
