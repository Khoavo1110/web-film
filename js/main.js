// === HEADER & NAV ===
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');

navbarMenuBtn.addEventListener('click', () => {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    navbarMenuBtn.classList.toggle('active');
});
navbarSearchBtn.addEventListener('click', () => navbarForm.classList.toggle('active'));
navbarFormCloseBtn.addEventListener('click', () => navbarForm.classList.toggle('active'));

// === BANNER SLIDER ===
const banners = document.querySelectorAll('.banner-container .banner-card');
const rightBtn = document.querySelector('.h2');
const leftBtn = document.querySelector('.h1');
let bannerIndex = 0;

rightBtn.addEventListener('click', () => {
    bannerIndex = (bannerIndex + 1) % banners.length;
    document.querySelector('.banner-container').style.right = bannerIndex * 100 + '%';
});
leftBtn.addEventListener('click', () => {
    bannerIndex = (bannerIndex - 1 + banners.length) % banners.length;
    document.querySelector('.banner-container').style.right = bannerIndex * 100 + '%';
});

// === PRODUCT FILTER ===
document.addEventListener("DOMContentLoaded", () => {
    const radioButtons = Array.from(document.querySelectorAll(".filter-radios input[type='radio']"));
    radioButtons.forEach(radio => {
        radio.addEventListener('click', () => {
            const index = radioButtons.indexOf(document.querySelector(".filter-radios input[type='radio']:checked"));
            document.querySelector('.product-container').style.right = index * 100 + '%';
        });
    });
});

// === CHI TIẾT SẢN PHẨM ===
document.querySelectorAll('.movie-card').forEach(card => {
    const btn = card.querySelector('.button');
    const chitiet = card.querySelector('.chitiet');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        chitiet.classList.toggle('active');
    });
});
document.querySelectorAll('.close-chitiet').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.classList.remove('active');
    });
});

// === MODAL ĐẶT HÀNG ===
document.querySelectorAll('.dathang').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        modal.style.display = "flex";

        // Bỏ active-modal cũ
        document.querySelectorAll('.movie-card').forEach(card => card.classList.remove('active-modal'));

        // Thêm vào thẻ đang click
        const productCard = button.closest('.movie-card');
        productCard.classList.add('active-modal');

        const gia = parseFloat(productCard.querySelector('.gia').innerText.replace(/\D/g, ''));
        const soLuongInput = modal.querySelector('input[name="soluong"]');

        const updateTongTien = () => {
            const soLuong = parseInt(soLuongInput.value) || 1;
            const tongTien = gia * soLuong;
            modal.querySelector('input[name="tongtien"]').value = tongTien.toLocaleString() + ' VND';
        };

        updateTongTien();
        soLuongInput.addEventListener('input', updateTongTien);
    });
});
document.querySelector('.cancel-button').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = "none";
});

// === GIỎ HÀNG (DÙNG LOCALSTORAGE) ===
const cartGioHang = document.querySelector('.cart-giohang');
document.querySelector('.navbar-cart-btn').addEventListener('click', () => cartGioHang.style.display = "flex");
document.querySelector('.close-giohang').addEventListener('click', () => cartGioHang.style.display = "none");

function saveCartToLocalStorage(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function updateCartUI() {
    const cartItems = loadCartFromLocalStorage();
    const cartBody = document.getElementById('cart-body');
    const totalPriceElement = document.getElementById('total-price');
    const cartQuantityElement = document.querySelector('.navbar-cart-quantity'); // Số lượng trong header

    cartBody.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartBody.innerHTML = '<tr><td colspan="6">Giỏ hàng của bạn đang trống!</td></tr>';
        totalPriceElement.textContent = '0 VND';
        cartQuantityElement.textContent = '(0)';
        return;
    }

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.img}" width="80px" height="80px"></td>
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()} VND</td>
            <td><input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}" style="width:60px;"></td>
            <td class="line-total">${(item.price * item.quantity).toLocaleString()} VND</td>
            <td><button class="remove" data-index="${index}">Xóa</button></td>
        `;
        cartBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${totalPrice.toLocaleString()} VND`;

    // Cập nhật số lượng giỏ hàng trong header
    cartQuantityElement.textContent = `(${cartItems.reduce((acc, item) => acc + item.quantity, 0)})`;

    // Bắt sự kiện thay đổi số lượng
    const quantityInputs = cartBody.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', function () {
            let index = parseInt(this.dataset.index);
            let newQuantity = parseInt(this.value);
            if (newQuantity < 1 || isNaN(newQuantity)) newQuantity = 1;
            const cartItems = loadCartFromLocalStorage();
            cartItems[index].quantity = newQuantity;
            saveCartToLocalStorage(cartItems);
            updateCartUI(); // Gọi lại để cập nhật UI và tổng
        });
    });

    // Bắt sự kiện xóa
    const removeButtons = cartBody.querySelectorAll('.remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            let index = parseInt(this.dataset.index);
            const cartItems = loadCartFromLocalStorage();
            cartItems.splice(index, 1);
            saveCartToLocalStorage(cartItems);
            updateCartUI();
        });
    });
}

function removeItem(index) {
    const cartItems = loadCartFromLocalStorage();
    cartItems.splice(index, 1);
    saveCartToLocalStorage(cartItems);
    updateCartUI();
}

function checkout() {
    const cartItems = loadCartFromLocalStorage();
    if (cartItems.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }

    localStorage.setItem('orderHistory', JSON.stringify(cartItems));
    alert('Thanh toán thành công!');
    localStorage.removeItem('cart');
    updateCartUI();
}

// === THÊM VÀO GIỎ HÀNG ===
document.querySelectorAll('.giohang').forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.movie-card');
        const imgSrc = productCard.querySelector('.card-img').src;
        const name = productCard.querySelector('.card-title').innerText;
        const price = parseFloat(productCard.querySelector('.gia').innerText.replace(/\D/g, ''));

        let cartItems = loadCartFromLocalStorage();
        const existingItem = cartItems.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ img: imgSrc, name, price, quantity: 1 });
        }

        saveCartToLocalStorage(cartItems);
        updateCartUI();
        alert('Đã thêm vào giỏ hàng! Lướt lên phần giỏ hàng để xem.');
    });
});
document.querySelector('.ok-button').addEventListener('click', function () {
    const modal = document.querySelector('.modal');
    const productCard = document.querySelector('.movie-card.active-modal');

    if (!productCard) {
        alert("Không lấy được sản phẩm.");
        return;
    }

    // Lấy dữ liệu từ form
    const sdt = modal.querySelector('input[name="sdt"]').value.trim();
    const diachi = modal.querySelector('input[name="diachi"]').value.trim();
    const soluong = parseInt(modal.querySelector('input[name="soluong"]').value) || 1;
    const tongtien = modal.querySelector('input[name="tongtien"]').value;
    const ghichu = modal.querySelector('textarea[name="ghichu"]').value.trim();

    // Kiểm tra bắt buộc
    if (!sdt || !diachi || !ghichu) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    // Lấy thông tin sản phẩm
    const imgSrc = productCard.querySelector('.card-img').src;
    const name = productCard.querySelector('.card-title').innerText;
    const price = parseFloat(productCard.querySelector('.gia').innerText.replace(/\D/g, ''));

    // Tạo đơn hàng
    const order = {
        img: imgSrc,
        name: name,
        price: price,
        quantity: soluong,
        sdt: sdt,
        diachi: diachi,
        tongtien: tongtien,
        ghichu: ghichu
    };

    // Lưu vào localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    alert('Đơn hàng đã được lưu!');

    // Reset và đóng modal
    modal.querySelector('form')?.reset(); // nếu bạn có <form>, dùng reset
    modal.style.display = 'none';
});

// === KHI TẢI TRANG ===
document.addEventListener('DOMContentLoaded', updateCartUI);
