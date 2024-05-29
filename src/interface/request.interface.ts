export interface IcreateRestaurant {
  restaurantName: string;
  USERID?: string;
}

export interface IupdateUser {
  id: string;
  role: string;
}

export interface IgetRestaurant {
  startCreated?: Date;
  restaurantName?: string;
  owner?: string;
  endCreated?: number;
}

export interface IgetRestaurantHeader {
  searchTerm?: string;
  page?: string;
  pagesize?: string;
}

export interface IupdateRestaurant {
  restaurantName: string;
  updatedrestaurantName: string
  USERTYPE: string;
  USERID: string
}
export interface IretrievedRestaurant {
  restaurantName: string;
  USERTYPE: string;
  USERID: string
}

