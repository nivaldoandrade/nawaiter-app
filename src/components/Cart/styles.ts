import styled from 'styled-components/native';

export const Container = styled.View``;

export const ProductContainer = styled.View`
  flex-direction: row;
  align-items: stretch;
  margin-bottom: 8px;
`;

export const Image = styled.Image`
  width: 48px;
  height: 40px;
  border-radius: 6px;
`;

export const Quantity = styled.View`
  min-width: 20px;
  margin-left: 12px;
`;

export const ProductDetails = styled.View`
  margin-left: 4px;
`;

export const Actions = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 44px;
  padding: 10px;
`;

export const FooterCart = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0 16px;
`;

export const Total = styled.View`
  flex: 1;
`;
