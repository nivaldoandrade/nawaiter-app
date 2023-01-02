import { useState } from 'react';
import { useCart } from '../context/useCart';

export function useModalTable() {
  const [isVisibleModalTable, setIsVisibleModalTable] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  const { clearCart } = useCart();

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleOpenModalTable() {
    setIsVisibleModalTable(true);
  }

  function handleCloseModalTable() {
    setIsVisibleModalTable(false);
  }

  function handleResetOrder() {
    setSelectedTable('');
    clearCart();
  }

  return {
    isVisibleModalTable,
    setIsVisibleModalTable,
    selectedTable,
    handleSaveTable,
    handleOpenModalTable,
    handleCloseModalTable,
    handleResetOrder
  };
}
