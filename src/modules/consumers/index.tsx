import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ComponentInfo, storedFunction } from 'src/types';

const parseComponentInfo = (info: ComponentInfo[]): JSX.Element[] => {
  return info.map(component => {
    const { type, text, config } = component;
    const Component = type as unknown as keyof JSX.IntrinsicElements;

    const configObj = config?.reduce((acc, { value, fn, attr }) => {
      return {
        ...acc,
        [attr]: () => storedFunction[fn](value),
      };
    }, {});

    return (
      <React.Fragment key={component.id}>
        {React.createElement(Component, configObj, text)}
      </React.Fragment>
    );
  });
};

export const Consumers = () => {
  const [items, setItems] = useState<ComponentInfo[] | null>(null);

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-300">
      <h2>Consumers</h2>
      <Box className="flex items-center gap-4 flex-col">
        {items && parseComponentInfo(items)}
      </Box>
    </div>
  );
};
