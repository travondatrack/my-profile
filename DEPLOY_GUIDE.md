# 🚀 HƯỚNG DẪN DEPLOY PORTFOLIO WEBSITE

## 📋 Tổng quan

Hướng dẫn chi tiết để deploy portfolio website lên GitHub Pages và Render để có thể update bài tập hàng tuần.

## 🔧 Chuẩn bị

### 1. Cài đặt Git (nếu chưa có)

```bash
# Kiểm tra git đã cài chưa
git --version

# Download và cài đặt từ: https://git-scm.com/
```

### 2. Tạo GitHub account

- Đăng ký tại: https://github.com
- Tạo repository mới (ví dụ: `portfolio-website`)

### 3. Cài đặt Node.js (cho Render)

```bash
# Kiểm tra Node.js
node --version
npm --version

# Download từ: https://nodejs.org/
```

## 🌐 DEPLOY LÊN GITHUB PAGES (Recommended)

### Bước 1: Khởi tạo Git repository

```bash
cd "d:\Tài liệu\Năm 3\HK1 25-26\LTWEB"
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### Bước 2: Kết nối với GitHub

```bash
# Thay [username] và [repository-name] bằng thông tin thực tế
git remote add origin https://github.com/[username]/[repository-name].git
git branch -M main
git push -u origin main
```

### Bước 3: Kích hoạt GitHub Pages

1. Vào repository trên GitHub
2. Click **Settings** tab
3. Scroll xuống **Pages** section
4. Chọn:
   - **Source:** Deploy from a branch
   - **Branch:** main
   - **Folder:** / (root)
5. Click **Save**

### Bước 4: Truy cập website

- Website sẽ có địa chỉ: `https://[username].github.io/[repository-name]`
- Có thể mất 5-10 phút để active

### Bước 5: Update bài tập hàng tuần

```bash
# Sau khi chỉnh sửa file index.html để thêm link bài tập
git add .
git commit -m "Update assignment week X: [mô tả]"
git push origin main

# Website sẽ tự động update sau 1-2 phút
```

## 🔥 DEPLOY LÊN RENDER (Dynamic Server)

### Bước 1: Tạo Render account

- Đăng ký tại: https://render.com
- Connect với GitHub account

### Bước 2: Tạo Web Service

1. Click **New +** > **Web Service**
2. Connect repository từ GitHub
3. Cấu hình:
   - **Name:** portfolio-website (hoặc tên khác)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

### Bước 3: Deploy

- Click **Create Web Service**
- Render sẽ tự động build và deploy
- Website sẽ có địa chỉ: `https://[app-name].render.com`

### Bước 4: Auto-deploy

- Render sẽ tự động deploy khi có thay đổi trên main branch
- Không cần làm gì thêm!

## 📝 WORKFLOW UPDATE BÀI TẬP HÀNG TUẦN

### Cách 1: Update trực tiếp trên GitHub (Dễ nhất)

1. Vào repository trên GitHub
2. Click vào file `index.html`
3. Click icon bút chì để edit
4. Tìm section assignments và update link
5. Scroll xuống, viết commit message
6. Click **Commit changes**
7. Website tự động update!

### Cách 2: Update local rồi push

```bash
# 1. Mở file index.html
# 2. Tìm phần assignment tuần cần update
# 3. Thêm link bài tập vào input field
# 4. Save file

# 5. Push lên GitHub
git add index.html
git commit -m "Update assignment week X: [link-bai-tap]"
git push origin main
```

## 🎯 TIPS & BEST PRACTICES

### 1. Commit message tốt

```bash
git commit -m "Update assignment week 1: HTML/CSS basic website"
git commit -m "Update assignment week 2: JavaScript form validation"
git commit -m "Add new project: IoT Dashboard"
```

### 2. Backup quan trọng

- GitHub tự động backup code
- Có thể download bất cứ lúc nào
- Version control để track changes

### 3. Monitor deployment

- **GitHub Pages:** Settings > Pages để xem status
- **Render:** Dashboard để xem deployment logs

### 4. Custom domain (Optional)

- Có thể setup custom domain cho GitHub Pages
- Thêm file `CNAME` với domain name

## 🆘 TROUBLESHOOTING

### Lỗi thường gặp:

#### 1. Git push bị rejected

```bash
git pull origin main --rebase
git push origin main
```

#### 2. GitHub Pages không update

- Kiểm tra Actions tab xem có lỗi không
- Có thể mất 5-10 phút để update

#### 3. Render build failed

- Kiểm tra logs trong Render dashboard
- Đảm bảo `package.json` và `server.js` đúng format

#### 4. Images không hiển thị

- Kiểm tra đường dẫn image trong code
- Đảm bảo folder `images/` được push lên GitHub

## 📞 Hỗ trợ

Nếu gặp vấn đề, có thể:

1. Check GitHub Issues
2. Google search lỗi cụ thể
3. Hỏi trên Stack Overflow
4. Xem documentation của GitHub Pages / Render

---

**Chúc bạn deploy thành công! 🎉**
