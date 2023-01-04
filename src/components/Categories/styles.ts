import styled from 'styled-components/native';
import { Platform } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.TouchableOpacity`
  min-width: 79px;
  align-items: center;
  padding: 0 6px;
`;

export const Icon = styled.View`
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  box-shadow: 0px 2px 1px rgba(0, 0, 0, ${isAndroid ? '1' : '0.1'});
  elevation: 2;
  margin-bottom: 8px;
`;
