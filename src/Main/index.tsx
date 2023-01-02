import { useState } from 'react';
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { OrderHeader } from '../components/OrderHeader';
import { ModalTable } from '../components/ModalTable';
import { Products } from '../components/Products';

import { useCart } from '../context/useCart';

import { Cart } from '../components/Cart';

import {
  Container,
  HeaderContainer,
  CategoriesContainer,
  ProductsContainer,
  Footer,
  FooterContainer
} from './styles';
import { useModalTable } from './useModalTable';

export function Main() {
  const {
    isVisibleModalTable,
    selectedTable,
    handleSaveTable,
    handleOpenModalTable,
    handleCloseModalTable,
    handleResetOrder
  } = useModalTable();

  const { cart } = useCart();

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
        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>
        <ProductsContainer>
          <Products
            selectedTable={selectedTable}
            onOpenModalTable={handleOpenModalTable}
          />
        </ProductsContainer>
      </Container>

      <Footer>
        {/* <FooterContainer> */}
        {cart?.length < 0 || selectedTable.length === 0 ? (
          <Button onPress={handleOpenModalTable}>Novo Pedido</Button>
        ) : (
          <Cart cartItems={cart} onResetOrder={handleResetOrder} />
        )}
        {/* </FooterContainer> */}
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
