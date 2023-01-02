import { Modal } from 'react-native';
import theme from '../../global/styles/theme';
import { Button } from '../Button';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

import { Container } from './styles';

interface ModalOrderConfirmedProps {
  visible: boolean;
  onClose: () => void;
}

export function ModalOrderConfirmed({
  visible,
  onClose
}: ModalOrderConfirmedProps) {
  return (
    <Modal visible={visible} animationType="fade">
      <Container>
        <Text>
          <CheckCircle />
        </Text>
        <Text
          size={20}
          weight="600"
          color={theme.colors.gray[0]}
          style={{ marginTop: 12, marginBottom: 4 }}
        >
          Pedido confirmado
        </Text>
        <Text
          opacity={0.9}
          color={theme.colors.gray[0]}
          style={{ marginBottom: 24 }}
        >
          O pedido já entrou na fila de produção!
        </Text>
        <Button bgColor={theme.colors.gray[0]} onPress={onClose}>
          <Text weight="600" color={theme.colors.primary.main}>
            Ok
          </Text>
        </Button>
      </Container>
    </Modal>
  );
}
