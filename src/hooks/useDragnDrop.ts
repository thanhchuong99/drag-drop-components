import { useCallback, useEffect, useState } from 'react';
import { ComponentInfo, ComponentType, FunctionType } from '../types';

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<ComponentInfo[]>([]);
  const [selectedEditItem, setSelectedEditItem] = useState<ComponentInfo>();

  const handleUpdateItem = useCallback((component: ComponentInfo) => {
    setListItems(prev => {
      const index = prev.findIndex(item => item.id === component.id);
      if (index === -1) {
        return prev;
      }
      prev[index] = component;
      return [...prev];
    });
    setSelectedEditItem(undefined);
  }, []);

  const handleDragging = useCallback(
    (dragging: boolean) => setIsDragging(dragging),
    [],
  );

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

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const type = e.dataTransfer.getData('text');
      const config =
        type === ComponentType.Button
          ? [
              {
                label: 'Message',
                value: '',
                fn: FunctionType.Alert,
                attr: 'onClick',
              },
            ]
          : undefined;

      setListItems(prev => [
        ...prev,
        { id: `${Date.now()}`, type: type as ComponentType, config },
      ]);
      handleDragging(false);
    },
    [handleDragging],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
    [],
  );

  const saveItems = useCallback(() => {
    const items = JSON.stringify(listItems);
    localStorage.setItem('items', items);
  }, [listItems]);

  const getItems = useCallback(() => {
    const items = localStorage.getItem('items');
    if (items) {
      setListItems(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    getItems();
  }, [getItems]);

  return {
    isDragging,
    listItems,
    handleUpdateItem,
    handleDragging,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleDragOver,
    setSelectedEditItem,
    selectedEditItem,
    saveItems,
  };
};
