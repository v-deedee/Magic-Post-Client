import { Table } from "flowbite-react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const loader = async () => {
  return "loader";
};

export const action = async ({ request, params }) => {
  return "action";
};

const Invoice = ({ invoiceData }) => {
  const handlePrint = (e) => {
    e.target.hidden = true;
    window.print(); // Sử dụng hàm in của trình duyệt
    e.target.hidden = false;
  };

  return (
    <>
      <div className="grid grid-cols-4">
        <div className="col-span-2">
          <img src="../../../public/logo.svg" className="h-20 w-20" />
          <p>MagicPost</p>
        </div>
        <div className="col-span-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/QR_Code_Example.svg/1200px-QR_Code_Example.svg.png"
            className="h-20 w-20"
          />
        </div>
        <div className="col-span-2">
          <h1>Sender</h1>
          <p>Name: DanhPB</p>
          <p>Phone: 0398152544</p>
          <p>Address: Mai Dich, Cau Giay, Ha Noi</p>
        </div>
        <div className="col-span-2">
          <h1>Receiver</h1>
          <p>Name: DanhPB</p>
          <p>Phone: 0398152544</p>
          <p>Address: Mai Dich, Cau Giay, Ha Noi</p>
        </div>

        <div className="col-span-4">
          <p>Thông tin đơn hàng</p>
          <p>Loại hàng: Tài liệu</p>
          <Table>
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Value</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Mặt hàng A</Table.Cell>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>1000 VNĐ</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <p>Note: Sample note blablaa</p>
        </div>

        <div className="col-span-2">
          <p>Cước: </p>
        </div>

        <div className="col-span-2">
          <p>Khối lượng: </p>
        </div>

        <div className="col-span-4">
          <p>Cam kết của người gửi: </p>
          <p>Tôi cam kết k gửi hàng bla bla</p>
          <p>Người gửi kí nhận:</p>
        </div>

        <div className="col-span-2">
          <h1>Bưu cục kí nhận</h1>
        </div>

        <div className="col-span-2">
          <h1>Ngày giờ kí nhận</h1>
        </div>
      </div>
      <button onClick={handlePrint}>Print Invoice</button>
    </>
  );
};

const TestApiPage: React.FC = () => {
  const sampleInvoiceData = {
    // Thông tin hóa đơn
  };

  return (
    <div>
      <Invoice invoiceData={sampleInvoiceData} />
    </div>
  );
};

export default TestApiPage;
