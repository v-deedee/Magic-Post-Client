import { Modal, Button, Label, TextInput, Select } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CreateDepartmentModalProps {
  openModal: boolean;
  setOpenModal: (newStatus: boolean) => void;
}

interface IFormInput {
  province: string;
  district: string;
  street: string;
  phone: string;
  type: string;
  cfs: string;
  zipcode: string;
}

const provinces = [
  {
    index: 0,
    province: "Ha Noi",
    districts: ["Ba Dinh", "Hoan Kiem", "Hai Ba Trung", "Dong Da", "Cau Giay", "Long Bien", "Hoang Mai", "Thanh Xuan", "Tay Ho", "Ha Dong", "Nam Tu Liem", "Bac Tu Liem"],
  },
  {
    index: 1,
    province: "Ho Chi Minh City",
    districts: ["District 1", "District 2", "District 3", "District 4", "District 5", "District 6", "District 7", "District 8", "District 9", "District 10", "District 11", "District 12", "Binh Thanh", "Thu Duc", "Go Vap", "Tan Binh", "Tan Phu", "Binh Tan"],
  },
  {
    index: 2,
    province: "Hai Phong",
    districts: ["Hong Bang", "Ngo Quyen", "Le Chan", "Kien An", "Hai An", "Duong Kinh"],
  },
  {
    index: 3,
    province: "Da Nang",
    districts: ["Hai Chau", "Thanh Khe", "Son Tra", "Ngu Hanh Son", "Cam Le", "Lien Chieu"],
  },
  {
    index: 4,
    province: "Hai Duong",
    districts: ["Hai Duong", "Kinh Mon", "Nam Sach", "Ninh Giang", "Cam Giang", "Thanh Ha"],
  },
  {
    index: 5,
    province: "Hung Yen",
    districts: ["Hung Yen", "My Hao", "Van Lam", "An Thi", "Khoai Chau", "Kim Dong"],
  },
  {
    index: 6,
    province: "Hoa Binh",
    districts: ["Hoa Binh", "Mai Chau", "Lac Son", "Kim Boi", "Luu Son", "Da Bac"],
  },
  {
    index: 7,
    province: "Ninh Binh",
    districts: ["Ninh Binh", "Tam Diep", "Nho Quan", "Gia Vien", "Hoa Lu", "Yen Khanh"],
  },
  {
    index: 8,
    province: "Thai Binh",
    districts: ["Thai Binh", "Hung Ha", "Quynh Phu", "Quynh Luu", "Dong Hung", "Tien Hai"],
  },
  {
    index: 9,
    province: "Vinh Phuc",
    districts: ["Vinh Yen", "Phuc Yen", "Yen Lac", "Tam Dao", "Binh Xuyen", "Song Lo"],
  },
  {
    index: 10,
    province: "Phu Tho",
    districts: ["Viet Tri", "Hung Hoa", "Thuy Nguyen", "Thanh Ba", "Yen Lap", "Cam Khe"],
  },
  {
    index: 11,
    province: "Bac Ninh",
    districts: ["Bac Ninh", "Tuu Son", "Tien Du", "Que Vo", "Gia Binh", "Yen Phong"],
  },
  {
    index: 12,
    province: "Quang Ninh",
    districts: ["Ha Long", "Mong Cai", "Cam Pha", "Uong Bi", "Quang Yen", "Dong Trieu"],
  },
  {
    index: 13,
    province: "Thua Thien Hue",
    districts: ["Hue", "Quang Dien", "Phong Dien", "Phu Vang", "Huong Tra", "Huong Thuy"],
  },
  {
    index: 14,
    province: "Quang Nam",
    districts: ["Tam Ky", "Hoi An", "Dai Loc", "Dien Ban", "Dai Loc", "Dong Giang"],
  },
  {
    index: 15,
    province: "Quang Ngai",
    districts: ["Quang Ngai", "Binh Son", "Son Tinh", "Tu Nghia", "Minh Long", "Mo Duc"],
  },
  {
    index: 16,
    province: "Binh Dinh",
    districts: ["Quy Nhon", "An Nhon", "Tay Son", "Hoai Nhon", "Phu My", "Van Canh"],
  },
  {
    index: 17,
    province: "Phu Yen",
    districts: ["Tuy Hoa", "Dong Hoa", "Tay Hoa", "Song Hinh", "Dong Xuan", "Son Hoa"],
  },
  {
    index: 18,
    province: "Khanh Hoa",
    districts: ["Nha Trang", "Cam Ranh", "Ninh Hoa", "Khanh Vinh", "Van Ninh", "Dien Khanh"],
  },
  {
    index: 19,
    province: "Ninh Thuan",
    districts: ["Phan Rang - Thap Cham", "Bac Ai", "Ninh Son", "Ninh Hai", "Ninh Phuoc", "Thuong Hai"],
  },
  {
    index: 20,
    province: "Binh Thuan",
    districts: ["Phan Thiet", "La Gi", "Tuy Phong", "Bac Binh", "Ham Thuan Bac", "Ham Thuan Nam"],
  },
  {
    index: 21,
    province: "Kon Tum",
    districts: ["Kon Tum", "Dak Glei", "Ngoc Hoi", "Dak To", "Kon Plong", "Tu Mo Rong"],
  },
  {
    index: 22,
    province: "Gia Lai",
    districts: ["Pleiku", "An Khe", "Ayun Pa", "Chu Pah", "Ia Grai", "Mang Yang"],
  },
  {
    index: 23,
    province: "Dak Lak",
    districts: ["Buon Ma Thuot", "Buon Ho", "Buon Don", "Ea Kar", "Ea Sup", "Krong Buk"],
  },
  {
    index: 24,
    province: "Lam Dong",
    districts: ["Da Lat", "Bao Loc", "Don Duong", "Duc Trong", "Di Linh", "Lac Duong"],
  },
  {
    index: 25,
    province: "Binh Duong",
    districts: ["Thu Dau Mot", "Thuan An", "Di An", "Tan Uyen", "Ben Cat", "Bau Bang"],
  },
  {
    index: 26,
    province: "Dong Nai",
    districts: ["Bien Hoa", "Long Khanh", "Nhon Trach", "Cam My", "Thong Nhat", "Tan Phu"],
  },
  {
    index: 27,
    province: "Binh Phuoc",
    districts: ["Dong Xoai", "Phuoc Long", "Binh Long", "Chon Thanh", "Dong Phu", "Bu Dang"],
  },
  {
    index: 28,
    province: "Tay Ninh",
    districts: ["Tay Ninh", "Trang Bang", "Go Dau", "Duong Minh Chau", "Chau Thanh", "Ben Cau"],
  },
  {
    index: 29,
    province: "Binh Thuan",
    districts: ["Phan Thiet", "La Gi", "Tuy Phong", "Bac Binh", "Ham Thuan Bac", "Ham Thuan Nam"],
  },
  {
    index: 30,
    province: "Long An",
    districts: ["Tan An", "Kien Tuong", "Can Giuoc", "Can Duoc", "Ben Luc", "Duc Hoa"],
  },
  {
    index: 31,
    province: "Tien Giang",
    districts: ["My Tho", "Go Cong", "Cai Lay", "Cai Be", "Chau Thanh", "Tan Phuoc"],
  },
  {
    index: 32,
    province: "Ben Tre",
    districts: ["Ben Tre", "Chau Thanh", "Chau Thanh", "Cho Lach", "Giong Trom", "Mo Cay"],
  },
  {
    index: 33,
    province: "Tra Vinh",
    districts: ["Tra Vinh", "Cang Long", "Chau Thanh", "Cau Ke", "Tieu Can", "Duyen Hai"],
  },
  {
    index: 34,
    province: "Vinh Long",
    districts: ["Vinh Long", "Long Ho", "Mang Thit", "Tam Binh", "Tra On", "Vung Liem"],
  },
  {
    index: 35,
    province: "Hau Giang",
    districts: ["Vi Thanh", "Vung Liem", "Long My", "Chau Thanh", "Chau Thanh", "Phung Hiep"],
  },
  {
    index: 36,
    province: "Kien Giang",
    districts: ["Rach Gia", "Ha Tien", "Kien Luong", "Hon Dat", "Tan Hiep", "Chau Thanh"],
  },
  {
    index: 37,
    province: "Can Tho",
    districts: ["Ninh Kieu", "Binh Thuy", "Cai Rang", "O Mon", "Thot Not", "Vinh Thanh"],
  },
  {
    index: 38,
    province: "An Giang",
    districts: ["Long Xuyen", "Chau Doc", "An Phu", "Tan Chau", "Thoai Son", "Chau Phu"],
  },
  {
    index: 39,
    province: "Dong Thap",
    districts: ["Cao Lanh", "Sa Dec", "Hong Ngu", "Tan Hong", "Tam Nong", "Thap Muoi"],
  },
  {
    index: 40,
    province: "Tien Giang",
    districts: ["My Tho", "Go Cong", "Cai Lay", "Cai Be", "Chau Thanh", "Tan Phuoc"],
  },
  {
    index: 41,
    province: "Vinh Long",
    districts: ["Vinh Long", "Long Ho", "Mang Thit", "Tam Binh", "Tra On", "Vung Liem"],
  },
  {
    index: 42,
    province: "Hau Giang",
    districts: ["Vi Thanh", "Vung Liem", "Long My", "Chau Thanh", "Chau Thanh", "Phung Hiep"],
  },
  {
    index: 43,
    province: "Kien Giang",
    districts: ["Rach Gia", "Ha Tien", "Kien Luong", "Hon Dat", "Tan Hiep", "Chau Thanh"],
  },
  {
    index: 44,
    province: "Can Tho",
    districts: ["Ninh Kieu", "Binh Thuy", "Cai Rang", "O Mon", "Thot Not", "Vinh Thanh"],
  },
  {
    index: 45,
    province: "An Giang",
    districts: ["Long Xuyen", "Chau Doc", "An Phu", "Tan Chau", "Thoai Son", "Chau Phu"],
  },
  {
    index: 46,
    province: "Dong Thap",
    districts: ["Cao Lanh", "Sa Dec", "Hong Ngu", "Tan Hong", "Tam Nong", "Thap Muoi"],
  },
  {
    index: 47,
    province: "Ben Tre",
    districts: ["Ben Tre", "Chau Thanh", "Chau Thanh", "Cho Lach", "Giong Trom", "Mo Cay"],
  },
  {
    index: 48,
    province: "Tra Vinh",
    districts: ["Tra Vinh", "Cang Long", "Chau Thanh", "Cau Ke", "Tieu Can", "Duyen Hai"],
  },
  {
    index: 49,
    province: "Vinh Long",
    districts: ["Vinh Long", "Long Ho", "Mang Thit", "Tam Binh", "Tra On", "Vung Liem"],
  },
  {
    index: 50,
    province: "Hau Giang",
    districts: ["Vi Thanh", "Vung Liem", "Long My", "Chau Thanh", "Chau Thanh", "Phung Hiep"],
  },
  {
    index: 51,
    province: "Kien Giang",
    districts: ["Rach Gia", "Ha Tien", "Kien Luong", "Hon Dat", "Tan Hiep", "Chau Thanh"],
  },
  {
    index: 52,
    province: "Can Tho",
    districts: ["Ninh Kieu", "Binh Thuy", "Cai Rang", "O Mon", "Thot Not", "Vinh Thanh"],
  },
  {
    index: 53,
    province: "An Giang",
    districts: ["Long Xuyen", "Chau Doc", "An Phu", "Tan Chau", "Thoai Son", "Chau Phu"],
  },
  {
    index: 54,
    province: "Dong Thap",
    districts: ["Cao Lanh", "Sa Dec", "Hong Ngu", "Tan Hong", "Tam Nong", "Thap Muoi"],
  },
  {
    index: 55,
    province: "Bac Lieu",
    districts: ["Bac Lieu", "Hồng Dan", "Phước Long", "Vĩnh Lợi", "Gia Rai", "Dong Hai"],
  },
  {
    index: 56,
    province: "Ca Mau",
    districts: ["Ca Mau", "U Minh", "Dam Doi", "Ngoc Hien", "Thoi Binh", "Tran Van Thoi"],
  },
  {
    index: 57,
    province: "Soc Trang",
    districts: ["Soc Trang", "Chau Thanh", "My Xuyen", "My Tu", "Cu Lao Dung", "Long Phu"],
  },
  {
    index: 58,
    province: "Tra Vinh",
    districts: ["Tra Vinh", "Cang Long", "Chau Thanh", "Cau Ke", "Tieu Can", "Duyen Hai"],
  },
  {
    index: 59,
    province: "Ben Tre",
    districts: ["Ben Tre", "Chau Thanh", "Chau Thanh", "Cho Lach", "Giong Trom", "Mo Cay"],
  },
  {
    index: 60,
    province: "Tien Giang",
    districts: ["My Tho", "Go Cong", "Cai Lay", "Cai Be", "Chau Thanh", "Tan Phuoc"],
  },
  {
    index: 61,
    province: "Vinh Long",
    districts: ["Vinh Long", "Long Ho", "Mang Thit", "Tam Binh", "Tra On", "Vung Liem"],
  },
  {
    index: 62,
    province: "Hau Giang",
    districts: ["Vi Thanh", "Vung Liem", "Long My", "Chau Thanh", "Chau Thanh", "Phung Hiep"],
  },
  {
    index: 63,
    province: "Bac Kan",
    districts: ["Bac Kan", "Bac Can", "Cho Don", "Ba Be", "Pac Nam", "Pac Ngoi"],
  },
];

const CreateDepartmentModal: React.FC<CreateDepartmentModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setOpenModal(false);
    reset();
  };
  return (
    <Modal
      dismissible
      show={openModal}
      size={"xl"}
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header>Create new department</Modal.Header>
      <Modal.Body>
        <form
          className="block grid-cols-2 gap-4 sm:grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Province */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="province" value="Province" />
            </div>
            <Select id="province" {...register("province", { required: true })}>
              <option value="" defaultChecked>
                
              </option>
              {provinces.map((province) => (<option value={province.province}>{province.province}</option>))}
            </Select>
            {errors.province && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* District */}
          <div className="">
            <div className="mb-2 block">
              <Label htmlFor="district" value="District" />
            </div>
            <Select id="district" {...register("district", { required: true })}>
              <option value="" defaultChecked>
                Select district
              </option>
              <option value="Cau Giay">Cau Giay</option>
            </Select>
            {errors.district && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Street */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="street" value="Street" />
            </div>
            <TextInput
              id="street"
              type="text"
              {...register("street", { required: true })}
              placeholder="Enter street"
            />
            {errors.street && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="phone" value="Phone" />
            </div>
            <TextInput
              id="phone"
              type="tel"
              {...register("phone", { required: true })}
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {/* Type */}
          <div className="col-span-2">
            <div className="mb-2 block">
              <Label htmlFor="type" value="Type" />
            </div>
            <Select id="type" {...register("type", { required: true })}>
              <option value="" defaultChecked>
                Select type
              </option>
              <option value="STORAGE">STORAGE</option>
              <option value="POSTOFFICE">POSTOFFICE</option>
            </Select>
            {errors.type && (
              <p className="text-red-500 dark:text-red-400">
                This field is required
              </p>
            )}
          </div>

          {watch("type") === "POSTOFFICE" && (
            <>
              {/* Cfs */}
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="cfs" value="Cfs" />
                </div>
                <TextInput
                  id="cfs"
                  type="tel"
                  {...register("cfs", { required: true })}
                  placeholder="Enter cfs"
                />
                {errors.cfs && (
                  <p className="text-red-500 dark:text-red-400">
                    This field is required
                  </p>
                )}
              </div>

              {/* Zipcode */}
              <div className="">
                <div className="mb-2 block">
                  <Label htmlFor="zipcode" value="Zipcode" />
                </div>
                <TextInput
                  id="zipcode"
                  type="tel"
                  {...register("zipcode", { required: true })}
                  placeholder="Enter zipcode"
                />
                {errors.zipcode && (
                  <p className="text-red-500 dark:text-red-400">
                    This field is required
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit */}
          <div className="col-span-2 flex justify-end gap-3 pt-3">
            <Button className="" type="submit">
              Create
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateDepartmentModal;
