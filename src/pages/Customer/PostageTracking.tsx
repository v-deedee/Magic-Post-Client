import { FC } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useActionData, useLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

interface IPostageTrackingProps {}

export async function loader({ request }) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  return id;
}

export const PostageTracking: FC<IPostageTrackingProps> = (props) => {
  const id = useLoaderData();

  return (
    <Form className="flex max-w-md flex-col gap-4" method="get" action="">
        <TextInput
          type="text"
          placeholder="Nhập mã bưu gửi"
          defaultValue={id}
          name="id"
          required
        />
     

      <Button type="submit">Tìm kiếm</Button>
    </Form>
  );
};
