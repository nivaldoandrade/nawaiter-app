import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { useCart } from '../context/useCart';

import api from '../services/api';

import { ICategory } from '../types/Category';
import { Product } from '../types/Product';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { ModalTable } from '../components/ModalTable';
import { OrderHeader } from '../components/OrderHeader';
import { Products } from '../components/Products';
import { Text } from '../components/Text';

import theme from '../global/styles/theme';

import { useModalTable } from './useModalTable';

import { formatProducts } from '../utils/formatProducts';
import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterContainer,
  HeaderContainer,
  ProductsContainer
} from './styles';

export function Main() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isVisibleModalTable,
    selectedTable,
    handleSaveTable,
    handleOpenModalTable,
    handleCloseModalTable,
    handleResetOrder
  } = useModalTable();

  const { cart } = useCart();

  useEffect(() => {
    async function loadCategoriesAndProducts() {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const [responseCategories, responseProducts] = await Promise.all([
        api.get('/categories'),
        api.get('/products')
      ]);
      const productsFormatted = formatProducts(responseProducts.data);

      setCategories(responseCategories.data);
      setProducts(productsFormatted);

      setIsLoading(false);
    }

    loadCategoriesAndProducts();
  }, []);

  async function handleSelectCategory(categoryId: string) {
    setIsLoadingProducts(true);

    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { data } = await api.get(route);

    const productsFormatted = formatProducts(data);

    setProducts(productsFormatted);
    setIsLoadingProducts(false);
  }

  return (
    <>
      <Container>
        <HeaderContainer>
          {!selectedTable ? (
            <Header />
          ) : (
            <OrderHeader
              table={selectedTable}
              onCancel={handleResetOrder}
              onOpenModalTable={handleOpenModalTable}
            />
          )}
        </HeaderContainer>
        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator size="large" color={theme.colors.primary.main} />
          </CenteredContainer>
        ) : (
          <>
            <CategoriesContainer>
              <Categories
                categories={categories}
                onSelectedCategory={handleSelectCategory}
              />
            </CategoriesContainer>
            <ProductsContainer>
              {isLoadingProducts ? (
                <CenteredContainer>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary.main}
                  />
                </CenteredContainer>
              ) : products.length === 0 ? (
                <CenteredContainer>
                  <Empty />
                  <Text
                    color={theme.colors.gray[400]}
                    style={{ marginTop: 24 }}
                  >
                    Nenhum produto foi encontrado!
                  </Text>
                </CenteredContainer>
              ) : (
                <Products
                  products={products}
                  selectedTable={selectedTable}
                  onOpenModalTable={handleOpenModalTable}
                />
              )}
            </ProductsContainer>
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          {cart?.length < 0 || selectedTable.length === 0 ? (
            <Button
              onPress={handleOpenModalTable}
              disabled={isLoading || isLoadingProducts}
            >
              Novo Pedido
            </Button>
          ) : (
            <Cart
              selectedTable={selectedTable}
              onResetOrder={handleResetOrder}
            />
          )}
        </FooterContainer>
      </Footer>

      <ModalTable
        selectedTable={selectedTable}
        visible={isVisibleModalTable}
        onClose={handleCloseModalTable}
        onSave={handleSaveTable}
      />
    </>
  );
}
