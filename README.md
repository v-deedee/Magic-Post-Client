# MagicPost (Client)

**#React
#TypeScript
#TailwindCSS**


#### Server: https://github.com/pbdanh/Magic-Post-Server
#### Demo: https://www.youtube.com/watch?v=EIR40qNdMPw

MagicPost là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. Mỗi điểm giao dịch phụ trách một vùng. Ngoài các điểm giao dịch, công ty cũng có nhiều điểm tập kết hàng hóa. Mỗi điểm giao dịch sẽ làm việc với một điểm tập kết. Ngược lại, một điểm tập kết sẽ làm việc với nhiều điểm giao dịch.


Run:
```bash
npm i
npm run dev
```

## Trang chủ

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/eea23e5b-706a-4f2b-a7c4-bece5aede2f8)


## Chức Năng Cho Từng Đối Tượng Sử Dụng

### Chức Năng Nhân Viên Nói Chung
- Đăng nhập tài khoản nhân viên.
     
![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/bb3e5dcd-9cf4-4378-96e3-e2763d5c9bbb)

    

### Chức Năng Lãnh Đạo Công Ty
- Quản lý hệ thống các điểm giao dịch (post office) và điểm tập kết (storage).

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/c9fca5fa-3e9b-42d1-9205-09e9c8a96824)


- Quản lý tài khoản trưởng điểm điểm tập kết và điểm giao dịch. Mỗi điểm giao dịch hoặc điểm tập kết có một tài khoản trưởng điểm.
    
![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/ece57cd3-b60d-42bd-99fb-e11d10d242e2)

    

### Chức Năng Trưởng Điểm
- Quản lý tài khoản cho nhân viên tại điểm giao dịch hoặc điểm tập kết tương ứng.
    
![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/77247c40-be14-4630-8dcc-a1d1944379d4)

    
### Chức Năng Giao Dịch Viên Tại Điểm Giao Dịch
- Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng.
    
- Tạo đơn chuyển hàng gửi đến điểm tập kết mỗi/trước khi đem hàng gửi đến điểm tập kết.

- Xác nhận (đơn) hàng về từ điểm tập kết.
    
- Tạo đơn hàng cần chuyển đến tay người nhận.

- Xác nhận hàng đã chuyển đến tay người nhận. Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch. Thống kê các hàng đã chuyển thành công, các hàng chuyển không thành công và trả lại điểm giao dịch.

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/5d38e8e7-9790-47f8-b6c3-ad996b864fde)
![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/595c4a5d-ea46-4e8f-87a0-6b9612bfa55a)

    

### Chức Năng Nhân Viên Tại Điểm Tập Kết
- Xác nhận (đơn) hàng đi từ điểm giao dịch chuyển đến.
    
- Tạo đơn chuyển hàng đến điểm tập kết đích (ứng với điểm giao dịch đích, tức điểm giao dịch phụ trách vùng ứng với địa chỉ của người nhận).
   
- Xác nhận (đơn) hàng nhận về từ điểm tập kết khác.
    
- Tạo đơn chuyển hàng đến điểm giao dịch đích.

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/20cc861a-3dd9-4f92-825c-0125c98d9615)

    

### Chức Năng Cho Khách Hàng
- Tra cứu trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/6c1bc1b5-335b-4515-b3dc-ac9eda671141)

- Ước tính cước phí vận chuyển.

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/dcfd2932-e45a-4d54-a428-fde59868bc7a)

- Tìm bưu cục gần nhất

![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/4b79c318-b4f1-4ef1-8590-c2e732b71622)



## Thiết kế đáp ứng

Responsive Table           |  Sidebar toggle
:-------------------------:|:-------------------------:
![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/fae22a13-34f6-4d49-8e23-7395d472bd74)  |  ![image](https://github.com/v-deedee/Magic-Post-Client/assets/100273875/62968e36-d9d9-4008-9c95-e247c87776fd)





