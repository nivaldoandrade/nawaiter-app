import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

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
export const Footer = styled.SafeAreaView`
  /* min-height: 110px; */
  background-color: ${({ theme }) => theme.colors.background};
`;
export const FooterContainer = styled.View`
  padding: 16px 24px;
`;

export const CenteredContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
