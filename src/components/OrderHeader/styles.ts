import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Table = styled.TouchableOpacity`
  margin-top: 24px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;
`;
