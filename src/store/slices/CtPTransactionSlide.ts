import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  CtPTransactionData: {
    sender: {
      name: "Tran Nam Khanh",
      phone: "0986543694",
      province: "Ha Noi",
      district: "Thanh Tri",
      street: "70 Dinh Tien Hoang",
      zipcode: "100000",
    },
    receiver: {
      name: "Do Duc Anh",
      phone: "0948153486",
      province: "Ha Noi",
      district: "Dong Anh",
      street: "144 Xuan Thuy",
      zipcode: "100000",
    },
    meta: {
      type: "DOCUMENT",
      note: "Fragile",
      cost: 40,
      item: [
        {
          name: "Text book",
          quantity: 1,
          value: 15000,
        },
        {
          name: "Note book",
          quantity: 2,
          value: 10000,
        },
      ],
    },
  }
};

const CtPTransactionSlide = createSlice({
  name: "CtPTransaction",
  initialState,
  reducers: {
    setState: (state, action) => {
      console.log(action.payload)
       state.CtPTransactionData = action.payload

    },
  },
});

export const { setState} = CtPTransactionSlide.actions;

export default CtPTransactionSlide.reducer;
