export interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Ingredient[];
}

export interface Ingredient {
  _id: string;
  name: string;
  icon: string;
}
