import { TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';

import theme from '../../global/styles/theme';

import { Container } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
  bgColor?: string;
}

export function Button({
  children,
  disabled,
  onPress,
  bgColor,
  ...rest
}: ButtonProps) {
  return (
    <Container
      disabled={disabled}
      bgColor={bgColor}
      onPress={onPress}
      {...rest}
    >
      <Text weight="600" color={theme.colors.gray[0]}>
        {children}
      </Text>
    </Container>
  );
}
