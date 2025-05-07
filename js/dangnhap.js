const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

// Chuyển đổi sang form đăng ký
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

// Chuyển đổi sang form đăng nhập
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

// Hiển thị popup đăng nhập/đăng ký
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

// Đóng popup
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Xử lý logic đăng nhập
document.querySelector('.login form').addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const email = document.querySelector('.login input[type="email"]').value;
    const password = document.querySelector('.login input[type="password"]').value;

    // Regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    // Lấy danh sách tài khoản từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra thông tin đăng nhập
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Đăng nhập thành công! Chào mừng ${user.username}`);
        wrapper.classList.remove('active-popup'); // Ẩn popup sau khi đăng nhập thành công
    } else {
        alert('Email hoặc mật khẩu không đúng!');
    }
});

// Xử lý logic đăng ký
document.querySelector('.register form').addEventListener('submit', (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    const username = document.querySelector('.register input[type="text"]').value;
    const email = document.querySelector('.register input[type="email"]').value;
    const password = document.querySelector('.register input[type="password"]').value;

    // Regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email không hợp lệ!');
        return;
    }

    // Regex kiểm tra mật khẩu (ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!');
        return;
    }

    // Kiểm tra nếu các trường không trống
    if (username && email && password) {
        // Lấy danh sách tài khoản từ localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kiểm tra xem email đã tồn tại chưa
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Email đã được sử dụng! Vui lòng sử dụng email khác.');
        } else {
            // Thêm tài khoản mới vào danh sách
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users)); // Lưu vào localStorage

            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            wrapper.classList.remove('active'); // Chuyển về form đăng nhập
        }
    } else {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
});


