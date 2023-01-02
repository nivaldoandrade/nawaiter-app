import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContainer = styled.View`
  margin-top: 20px;
  padding: 0 24px;
`;

export const CategoriesContainer = styled.View`
  height: 73px;
`;
export const ProductsContainer = styled.View`
  flex: 1;
`;
export const Footer = styled.View`
  min-height: 110px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px 24px;
`;
export const FooterContainer = styled.SafeAreaView``;
