export interface Manager {
  _id: string;
  username: string;
  role: string;
  department: {
    _id: string;
    province: string;
    district: string;
    street: string;
    type: string;
  };
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  active: boolean;
  __v: number;
}

export const defaultManager = {
  _id: "",
  username: "",
  role: "",
  department: {
    _id: "",
    province: "",
    district: "",
    street: "",
    type: "",
  },
  firstname: "",
  lastname: "",
  gender: "",
  email: "",
  active: false,
  __v: 0,
};
