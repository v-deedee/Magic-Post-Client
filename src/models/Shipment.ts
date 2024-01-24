export interface Shipment {
  sender: {
    name: string;
    phone: string;
    province: string;
    district: string;
    street: string;
    zipcode: string;
  };
  receiver: {
    name: string;
    phone: string;
    province: string;
    district: string;
    street: string;
    zipcode: string;
  };
  meta: {
    type: string;
    cost: number;
    start: string;
    item: {
      name: string;
      quantity: number;
      value: number;
      _id: string;
    }[];
    note: string;
  };
  _id: string;
  status: string;
}

export const defaultShipment: Shipment = {
  sender: {
    name: "",
    phone: "",
    province: "",
    district: "",
    street: "",
    zipcode: "999999",
  },
  receiver: {
    name: "",
    phone: "",
    province: "",
    district: "",
    street: "",
    zipcode: "999999",
  },
  meta: {
    type: "",
    cost: 0,
    start: "",
    item: [
      {
        name: "",
        quantity: 0,
        value: 0,
        _id: "",
      },
    ],
    note: "",
  },
  _id: "",
  status: "",
};
