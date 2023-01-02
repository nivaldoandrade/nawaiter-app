import { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { Text } from '../Text';

import { categories } from '../../mocks/categories';

import { Container, Icon } from './styles';

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    setSelectedCategory((state) => (state === categoryId ? '' : categoryId));
  }

  const renderCategory: ListRenderItem<typeof categories[number]> = ({
    item: category
  }) => {
    const isSelectCategory = selectedCategory === category._id;

    return (
      <Container onPress={() => handleSelectCategory(category._id)}>
        <Icon>
          <Text opacity={isSelectCategory ? 1 : 0.5}>{category.icon}</Text>
        </Icon>
        <Text size={14} weight="600" opacity={isSelectCategory ? 1 : 0.5}>
          {category.name}
        </Text>
      </Container>
    );
  };

  return (
    <FlatList
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 20
      }}
      showsHorizontalScrollIndicator={false}
      data={categories}
      keyExtractor={(item) => item._id}
      renderItem={renderCategory}
    />
  );
}
