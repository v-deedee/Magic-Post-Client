export interface Department {
  _id: string;
  province: string;
  district: string;
  street: string;
  phone: string;
  type: string;
  cfs: {
    _id: string;
    province: string;
    district: string;
    street: string;
    type: string;
  };
  zipcode: string;
  active: boolean;
  __v: number;
  geocoding: number[];
}
