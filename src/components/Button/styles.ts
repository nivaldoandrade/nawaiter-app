import styled from 'styled-components/native';

interface ContainerProps {
  bgColor?: string;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  padding: 14px 24px;
  background-color: ${({ theme, disabled, bgColor }) =>
    !disabled ? bgColor ?? theme.colors.primary.main : theme.colors.gray[300]};
  align-items: center;
  justify-content: center;
  border-radius: 48px;
`;
