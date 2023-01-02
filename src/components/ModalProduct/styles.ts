import styled from 'styled-components/native';

export const ImageContainer = styled.ImageBackground`
  width: 100%;
  height: 200px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin: 24px;
`;

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};

  flex: 1;
`;

export const Header = styled.View`
  margin: 32px 24px;
`;

export const IngredientContainer = styled.View`
  flex: 1;
  margin: 0 24px;
`;

export const IngredientContent = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;

  border: 1px solid rgba(204, 204, 204, 0.3);
  margin-bottom: 4px;
  border-radius: 8px;
`;

export const Footer = styled.View`
  min-height: 114px;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PriceContainer = styled.View``;
