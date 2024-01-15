# MagicPost

MagicPost là công ty hoạt động trong lĩnh vực chuyển phát. Công ty này có các điểm giao dịch phủ khắp cả nước. Mỗi điểm giao dịch phụ trách một vùng. Ngoài các điểm giao dịch, công ty cũng có nhiều điểm tập kết hàng hóa. Mỗi điểm giao dịch sẽ làm việc với một điểm tập kết. Ngược lại, một điểm tập kết sẽ làm việc với nhiều điểm giao dịch.


Run:
```bash
npm run dev
```

## Chức Năng Cho Từng Đối Tượng Sử Dụng

### Chức Năng Nhân Viên Nói Chung
- Đăng nhập tài khoản nhân viên.
     

- Đổi mật khẩu tài khoản nhân viên.
    

### Chức Năng Lãnh Đạo Công Ty
- Quản lý hệ thống các điểm giao dịch và điểm tập kết.
    

- Quản lý tài khoản trưởng điểm điểm tập kết và điểm giao dịch. Mỗi điểm giao dịch hoặc điểm tập kết có một tài khoản trưởng điểm.
    

- Thống kê hàng gửi, hàng nhận trên toàn quốc, từng điểm giao dịch hoặc điểm tập kết.
    

### Chức Năng Trưởng Điểm Tại Điểm Giao Dịch
- Quản lý tài khoản cho giao dịch viên tại điểm giao dịch.
    

- Thống kê hàng gửi, hàng nhận tại điểm giao dịch.
    
### Chức Năng Giao Dịch Viên Tại Điểm Giao Dịch
- Ghi nhận hàng cần gửi của khách (người gửi), in giấy biên nhận chuyển phát và phát cho khách hàng.
    
    Note: Sử dụng api để tạo QR code khi in giấy biên nhận.
    
- Tạo đơn chuyển hàng gửi đến điểm tập kết mỗi/trước khi đem hàng gửi đến điểm tập kết.

    Note: In danh sách đơn hàng đã đõng gói, sẵn sàng để gửi lên điểm tập kết.
    

- Xác nhận (đơn) hàng về từ điểm tập kết.
    
- Tạo đơn hàng cần chuyển đến tay người nhận.
    

- Xác nhận hàng đã chuyển đến tay người nhận theo. Xác nhận hàng không chuyển được đến người nhận và trả lại điểm giao dịch. Thống kê các hàng đã chuyển thành công, các hàng chuyển không thành công và trả lại điểm giao dịch.
   

### Chức Năng Trưởng Điểm Tại Điểm Tập Kết
- Quản lý tài khoản cho nhân viên viên tại điểm tập kết.
    

### Chức Năng Nhân Viên Tại Điểm Tập Kết
- Xác nhận (đơn) hàng đi từ điểm giao dịch chuyển đến.
    

- Tạo đơn chuyển hàng đến điểm tập kết đích (ứng với điểm giao dịch đích, tức điểm giao dịch phụ trách vùng ứng với địa chỉ của người nhận).
    
   
- Xác nhận (đơn) hàng nhận về từ điểm tập kết khác.
    

- Tạo đơn chuyển hàng đến điểm giao dịch đích.
    

### Chức Năng Cho Khách Hàng
- Tra cứu trạng thái và tiến trình chuyển phát của kiện hàng mình gửi.
    
