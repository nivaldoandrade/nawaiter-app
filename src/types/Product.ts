export interface Product {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  uriImg: string;
  price: number;
  priceformatted: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  _id: string;
  name: string;
  icon: string;
}
