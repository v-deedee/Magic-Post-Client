export interface Transaction {
  _id: string;
  shipment: string;
  sender: string;
  start: string;
  pos: {
    _id: string;
    province: string;
    district: string;
    street: string;
    type: string;
  };
  des: {
    _id: string;
    province: string;
    district: string;
    street: string;
    type: string;
  };
  status: string;
  __v: number;
  end: string;
  receiver: string;
}
