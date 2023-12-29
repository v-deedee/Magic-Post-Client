import { Button, Table } from "flowbite-react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export const loader = async () => {
  return "loader";
};

export const action = async ({ request, params }) => {
  return "action";
};


const TestApiPage: React.FC = () => {
  

  return (
    <>
      <Link to="/print" state={{ some: "value" }}>Hehe</Link>
    </>
  );
};

export default TestApiPage;
