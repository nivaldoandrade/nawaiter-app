import { useEffect, useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';

import { useCart } from '../../context/useCart';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import theme from '../../global/styles/theme';

import { Form, Header, InputTable, ModalBody, Overlay } from './styles';

interface ModalTableProps {
  selectedTable: string;
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function ModalTable({
  selectedTable,
  visible,
  onClose,
  onSave
}: ModalTableProps) {
  const [table, setTable] = useState('');
  const { clearCart } = useCart();

  useEffect(() => {
    setTable(selectedTable);
  }, [selectedTable]);

  function handleSelectTable() {
    onSave(table);
    onClose();
    setTable('');
  }

  function handleCloseButton() {
    if (!selectedTable) {
      clearCart();
    }
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informar a mesa</Text>
            <TouchableOpacity onPress={handleCloseButton}>
              <Close color={theme.colors.gray[400]} />
            </TouchableOpacity>
          </Header>
          <Form>
            <InputTable
              placeholder="Número da mesa"
              onChangeText={setTable}
              value={table}
            />
          </Form>
          <Button disabled={!table} onPress={handleSelectTable}>
            Salvar
          </Button>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
