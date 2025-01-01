export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectedImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};
export type ReviewsType = {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdDate: string;
  user: UserType;
};

export type productType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  inStock: boolean;
  images: SelectedImgType[];
  reviews: ReviewsType[];
};
