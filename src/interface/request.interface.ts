export interface IcreateRestaurant {
  restaurantName: string;
  USERID?: string;
}

export interface IupdateUser {
  id: string;
  role: string;
}

export interface IgetRestaurant {
  startCreated ?: Date;
  restaurantName ?: string;
  owner ?: string;
  endCreated ?: number;
}

export interface IgetRestaurantHeader {
  searchTerm ?: string ;
  page ?: string;
  pagesize ?: string;
}