import { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { useCart } from '../../context/useCart';
import theme from '../../global/styles/theme';
import { ICartItem } from '../../types/Cart';
import { formatPrice } from '../../utils/formaPrice';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { ModalOrderConfirmed } from '../ModalOrderConfirmed';
import { Text } from '../Text';

import {
  Container,
  ProductContainer,
  Image,
  Quantity,
  ProductDetails,
  Actions,
  ActionButton,
  FooterCart,
  Total
} from './styles';

interface CartProps {
  cartItems: ICartItem[];
  onResetOrder: () => void;
}
[];

export function Cart({ cartItems, onResetOrder }: CartProps) {
  const [isVisibleModalOrderConfirmed, setisVisibleModalOrderConfirmed] =
    useState(false);
  const { updatedQuantityProduct, subTotalProduct, total } = useCart();

  function handleOpenModalOrderConfirmed() {
    setisVisibleModalOrderConfirmed(true);
  }

  function handleCloseModalOrderConfirmed() {
    onResetOrder();
    setisVisibleModalOrderConfirmed(false);
  }

  function handleUpdateQuantity(productId: string, quantity: number) {
    updatedQuantityProduct(productId, quantity);
  }

  const renderItem: ListRenderItem<ICartItem> = ({ item }) => {
    return (
      <ProductContainer>
        <Image source={{ uri: 'https://source.unsplash.com/random/?pizza' }} />
        <Quantity>
          <Text size={14} color={theme.colors.gray[400]}>
            {item.quantity}x
          </Text>
        </Quantity>
        <ProductDetails>
          <Text size={14} weight="600">
            {item.product.name}
          </Text>
          <Text
            size={14}
            color={theme.colors.gray[400]}
            style={{ marginTop: 4 }}
          >
            {subTotalProduct[item.product._id]}
          </Text>
        </ProductDetails>
        <Actions>
          <ActionButton
            onPress={() =>
              handleUpdateQuantity(item.product._id, item.quantity + 1)
            }
          >
            <PlusCircle />
          </ActionButton>
          <ActionButton
            onPress={() =>
              handleUpdateQuantity(item.product._id, item.quantity - 1)
            }
          >
            <MinusCircle />
          </ActionButton>
        </Actions>
      </ProductContainer>
    );
  };

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ maxHeight: 120 }}
        data={cartItems}
        keyExtractor={({ product }) => product._id}
        renderItem={renderItem}
      />
      <FooterCart>
        <Total>
          {cartItems.length > 0 ? (
            <>
              <Text color={theme.colors.gray[400]}>Total</Text>
              <Text size={20} weight="600">
                {total}
              </Text>
            </>
          ) : (
            <Text color={theme.colors.gray[300]} style={{ marginRight: 42 }}>
              Seu carrinho está vazio
            </Text>
          )}
        </Total>
        <Button
          onPress={handleOpenModalOrderConfirmed}
          disabled={cartItems.length < 1}
        >
          <Text weight="600" color={theme.colors.gray[0]}>
            Confirmar Pedido
          </Text>
        </Button>
      </FooterCart>

      <ModalOrderConfirmed
        visible={isVisibleModalOrderConfirmed}
        onClose={handleCloseModalOrderConfirmed}
      />
    </Container>
  );
}
