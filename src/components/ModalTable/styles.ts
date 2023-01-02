import styled from 'styled-components/native';

export const Overlay = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  padding: 0 24px;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalBody = styled.View`
  border-radius: 8px;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Form = styled.View`
  margin-bottom: 24px;
`;

export const InputTable = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.gray[400],
  keyboardType: 'number-pad'
}))`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray[0]};
  border: 1px solid rgba(204, 204, 204, 0.5);
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts['GS-400']};
  font-size: 16px;
`;
