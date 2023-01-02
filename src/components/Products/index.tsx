import { FlatList, ListRenderItem } from 'react-native';

import { Text } from '../Text';

import { products } from '../../mocks/products';

import theme from '../../global/styles/theme';

import { PlusCircle } from '../Icons/PlusCircle';

import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddProductToCartButton
} from './styles';
import { formatPrice } from '../../utils/formaPrice';
import { ModalProduct } from '../ModalProduct';
import { useCallback, useState } from 'react';
import { Product } from '../../types/Product';
import { useCart } from '../../context/useCart';

interface ProductsProps {
  selectedTable: string;
  onOpenModalTable: () => void;
}

export function Products({ selectedTable, onOpenModalTable }: ProductsProps) {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  const { addCart } = useCart();

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);
    setIsVisibleModal(true);
  }

  function handleCLoseModal() {
    setIsVisibleModal(false);
    setSelectedProduct(null);
  }

  function handleAddCart(product: Product) {
    if (!selectedTable) {
      onOpenModalTable();
    }

    addCart(product);
  }

  const renderProduts: ListRenderItem<typeof products[number]> = ({
    item: product
  }) => {
    return (
      <ProductContainer onPress={() => handleOpenModal(product)}>
        <ProductImage
          source={{ uri: 'https://source.unsplash.com/random/?pizza' }}
        />
        <ProductDetails>
          <Text weight="600">{product.name}</Text>
          <Text size={14} color={theme.colors.gray[400]}>
            {product.description}
          </Text>
          <Text size={14} weight="600">
            {formatPrice(product.price)}
          </Text>
        </ProductDetails>

        <AddProductToCartButton onPress={() => handleAddCart(product)}>
          <PlusCircle />
        </AddProductToCartButton>
      </ProductContainer>
    );
  };

  return (
    <>
      <FlatList
        ItemSeparatorComponent={Separator}
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        renderItem={renderProduts}
      />
      <ModalProduct
        visible={isVisibleModal}
        product={selectedProduct}
        onClose={handleCLoseModal}
        onAddCart={handleAddCart}
      />
    </>
  );
}
