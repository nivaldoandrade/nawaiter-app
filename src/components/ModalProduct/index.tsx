import { FlatList, ListRenderItem, Modal } from 'react-native';

import { Ingredient, Product } from '../../types/Product';

import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';

import theme from '../../global/styles/theme';

import {
  CloseButton,
  Container,
  Footer,
  FooterContainer,
  Header,
  ImageContainer,
  IngredientContainer,
  IngredientContent,
  PriceContainer
} from './styles';

interface ModalProductProps {
  visible: boolean;
  product: null | Product;
  onClose: () => void;
  onAddCart: (product: Product) => void;
}

export function ModalProduct({
  visible,
  product,
  onClose,
  onAddCart
}: ModalProductProps) {
  if (!product) {
    return null;
  }

  function handleAddProduct(product: Product) {
    onAddCart(product);
    onClose();
  }

  const renderIngredients: ListRenderItem<Ingredient> = ({
    item: ingredient
  }) => {
    return (
      <IngredientContent>
        <Text style={{ marginRight: 20 }}>{ingredient.icon}</Text>
        <Text size={14} color={theme.colors.gray[400]}>
          {ingredient.name}
        </Text>
      </IngredientContent>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      style={{ backgroundColor: '#f00' }}
      onRequestClose={onClose}
      onDismiss={() => console.log('Modal dismissed')}
    >
      <Container>
        <ImageContainer
          source={{
            uri: product.uriImg
          }}
        >
          <CloseButton onPress={onClose}>
            <Close />
          </CloseButton>
        </ImageContainer>

        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color={theme.colors.gray[400]} style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </Header>

        {product.ingredients.length > 0 && (
          <IngredientContainer>
            <Text weight="600" color={theme.colors.gray[400]}>
              Ingredientes
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              data={product.ingredients}
              keyExtractor={(ingredient) => ingredient._id}
              renderItem={renderIngredients}
            />
          </IngredientContainer>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color={theme.colors.gray[400]}>Preço</Text>
            <Text size={20} weight="600">
              {product.priceformatted}
            </Text>
          </PriceContainer>
          <Button onPress={() => handleAddProduct(product)}>
            <Text weight="600" color={theme.colors.gray[0]}>
              Adicionar ao pedido
            </Text>
          </Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
