import { useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';

import { ICategory } from '../../types/Category';

import { Text } from '../Text';

import { Container, Icon } from './styles';

interface CategoriesProps {
  categories: ICategory[];
  onSelectedCategory: (categoryId: string) => Promise<void>;
}

export function Categories({
  categories,
  onSelectedCategory
}: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;

    setSelectedCategory(category);
    onSelectedCategory(category);
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
