import { TouchableOpacity } from 'react-native';

import { Text } from '../Text';

import theme from '../../global/styles/theme';

import { Container, Header, Table } from './styles';

interface HeaderOrderProps {
  table: string;
  onCancel: () => void;
  onOpenModalTable: () => void;
}

export function OrderHeader({
  table,
  onCancel,
  onOpenModalTable
}: HeaderOrderProps) {
  return (
    <Container>
      <Header>
        <Text size={24} weight="600">
          Pedido
        </Text>
        <TouchableOpacity onPress={onCancel}>
          <Text size={14} weight="600" color={theme.colors.primary.main}>
            Cancelar pedido
          </Text>
        </TouchableOpacity>
      </Header>
      <Table onPress={onOpenModalTable}>
        <Text color={theme.colors.gray[400]}>Mesa {table}</Text>
      </Table>
    </Container>
  );
}
