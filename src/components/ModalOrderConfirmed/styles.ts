import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary.main};
  flex: 1;
  align-items: center;
  justify-content: center;
`;
