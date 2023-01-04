import { useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';

import { useCart } from '../../context/useCart';

import api from '../../services/api';

import { ICartItem } from '../../types/Cart';

import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { ModalOrderConfirmed } from '../ModalOrderConfirmed';
import { Text } from '../Text';

import theme from '../../global/styles/theme';

import {
  ActionButton,
  Actions,
  Container,
  FooterCart,
  Image,
  ProductContainer,
  ProductDetails,
  Quantity,
  Total
} from './styles';

interface CartProps {
  selectedTable?: string;
  onResetOrder: () => void;
}
[];

export function Cart({ selectedTable, onResetOrder }: CartProps) {
  const [isVisibleModalOrderConfirmed, setisVisibleModalOrderConfirmed] =
    useState(false);
  const [isLoadingConfirmOrder, setIsLoadingConfirmOrder] = useState(false);

  const { cart, updatedQuantityProduct, subTotalProduct, total } = useCart();

  async function handleConfirmOrder() {
    setIsLoadingConfirmOrder(true);
    const cartProductFormatted = cart.map((item) => ({
      product: item.product._id,
      quantity: item.quantity
    }));

    const payload = {
      table: selectedTable,
      products: cartProductFormatted
    };

    await new Promise((resolve) => setTimeout(resolve, 3000));

    api
      .post('/orders', payload)
      .then(() => {
        setisVisibleModalOrderConfirmed(true);
      })
      .finally(() => setIsLoadingConfirmOrder(false));
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
        <Image
          source={{
            uri: item.product.uriImg
          }}
        />
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
        data={cart}
        keyExtractor={({ product }) => product._id}
        renderItem={renderItem}
      />
      <FooterCart>
        <Total>
          {cart.length > 0 ? (
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
          onPress={handleConfirmOrder}
          disabled={cart.length < 1 || isLoadingConfirmOrder}
        >
          {!isLoadingConfirmOrder ? (
            <Text weight="600" color={theme.colors.gray[0]}>
              Confirmar Pedido
            </Text>
          ) : (
            <ActivityIndicator color={theme.colors.primary.main} />
          )}
        </Button>
      </FooterCart>

      <ModalOrderConfirmed
        visible={isVisibleModalOrderConfirmed}
        onClose={handleCloseModalOrderConfirmed}
      />
    </Container>
  );
}
