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

export const defaultDepartment = {
  _id: "",
  province: "",
  district: "",
  street: "",
  phone: "",
  type: "",
  cfs: {
    _id: "",
    province: "",
    district: "",
    street: "",
    type: "",
  },
  zipcode: "",
  active: false,
  __v: 1,
  geocoding: [],
};
