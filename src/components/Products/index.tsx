import { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { useCart } from '../../context/useCart';

import { Product } from '../../types/Product';

import { PlusCircle } from '../Icons/PlusCircle';
import { ModalProduct } from '../ModalProduct';
import { Text } from '../Text';

import theme from '../../global/styles/theme';

import {
  AddProductToCartButton,
  ProductContainer,
  ProductDetails,
  ProductImage,
  Separator
} from './styles';

interface ProductsProps {
  products: Product[];
  selectedTable: string;
  onOpenModalTable: () => void;
}

export function Products({
  products,
  selectedTable,
  onOpenModalTable
}: ProductsProps) {
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
          source={{
            uri: product.uriImg
          }}
        />
        <ProductDetails>
          <Text weight="600">{product.name}</Text>
          <Text size={14} color={theme.colors.gray[400]}>
            {product.description}
          </Text>
          <Text size={14} weight="600">
            {product.priceformatted}
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
