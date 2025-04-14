const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');
const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');

function navIsActive() {
    header.classList.toggle('active');
    nav.classList.toggle('active');
    navbarMenuBtn.classList.toggle('active');

}

navbarMenuBtn.addEventListener('click', navIsActive);

const searchBarIsActive = () => navbarForm.classList.toggle('active');

navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);
const  number=document.querySelectorAll('.banner-container .banner-card');
console.log(number);
const right_btn=document.querySelector('.h2');
console.log(right_btn);
const left_btn=document.querySelector('.h1');
console.log(left_btn);
let index=0;
right_btn.addEventListener('click',()=>{
    index=index+1;
if(index>number.length-1){
    index=0;
}
    document.querySelector('.banner-container').style.right=index*100+"%";
});
left_btn.addEventListener('click',()=>{
    index=index-1;
    if(index<0){
        index=number.length-1;
    }
    document.querySelector('.banner-container').style.right=index*100+"%";
});
const number_movie_grid=document.querySelectorAll('.product-container .movies-grid')
console.log(number_movie_grid)
let new_index=0;
const Male=document.querySelector('#featured');
const Fm=document.querySelector('#popular'); 
const Ult=document.querySelector('#newest');
//  kiểm tra vị trí của checkbox

document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = Array.from(document.querySelectorAll(".filter-radios input[type='radio']"));

    function getSelectedIndex() {
        return radioButtons.indexOf(document.querySelector(".filter-radios input[type='radio']:checked"));
    }

    radioButtons.forEach(radio => {
        radio.addEventListener('click', () => {
            let new_index=getSelectedIndex()
            document.querySelector('.product-container').style.right=new_index*100+"%";
        });
    });
});
//feedback
const numberoffeed=document.querySelectorAll('.feedback-container .feedback-card');
let indexoffeed=0;
function duychuyen(){
 indexoffeed=indexoffeed+1;
 setTimeout(()=>{
    if(indexoffeed>numberoffeed.length-1){
        indexoffeed=0;
    }
    document.querySelector('.feedback-container').style.right=indexoffeed*100+"%";
    duychuyen();
 },5000);
}
duychuyen()
const dathang=document.querySelectorAll('.dathang');  
dathang.forEach(button => {
    button.addEventListener('click', () => {
        // Mở modal
        const modal = document.querySelector('.modal');
        modal.style.display = "flex";
        
        // Lấy phần tử cha của nút dathang để tìm sản phẩm tương ứng
        const productCard = button.closest('.movie-card');  // Giả sử .movie-card là lớp của mỗi sản phẩm
        
        // Lấy giá của sản phẩm tương ứng (tìm trong phạm vi của productCard)
        const gia = parseFloat(productCard.querySelector('.gia').innerText.replace('VND', '').replace('.', '').trim());

        // Lấy input số lượng trong modal
        const soLuongInput = document.querySelector('input[name="soluong"]');

        // Hàm tính tổng tiền và cập nhật vào input "Tổng Tiền"
        const updateTongTien = () => {
            const soLuong = parseInt(soLuongInput.value) || 1;  // Tránh trường hợp người dùng nhập giá trị không hợp lệ
            const tongTien = gia * soLuong;
            document.querySelector('input[name="tongtien"]').value = tongTien.toLocaleString() + ' VND';  // Cập nhật vào input tổng tiền
        };

        // Cập nhật tổng tiền ngay khi modal mở
        updateTongTien();

        // Thêm sự kiện input để cập nhật tổng tiền khi số lượng thay đổi
        soLuongInput.addEventListener('input', updateTongTien);
    });
});
document.querySelector('.close').addEventListener('click',()=>{
    document.querySelector('.modal').style.display="none";
}   );
const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    const btn = card.querySelector('.button');     // button xem chi tiết trong card
    const chitiet = card.querySelector('.chitiet'); // phần chi tiết trong card

    // Gắn sự kiện click cho từng button
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Chặn load link nếu có
        chitiet.classList.toggle('active'); // Ẩn/hiện chi tiết
    });
});
const btnclose_chitiet=document.querySelectorAll('.close-chitiet');
btnclose_chitiet.forEach(btn=>{
    btn.addEventListener('click',()=>{
        btn.parentElement.classList.remove('active');
    })
}); 
/* thêm giỏ hàng*/

// Bắt hết tất cả nút giohang
let btnGioHang = document.querySelectorAll('.giohang');

function updateTotal() {
    let total = 0;
    document.querySelectorAll('#cart-body tr').forEach(function(row) {
        let priceText = row.querySelector('.item-price').innerText;
        let priceNumber = parseFloat(priceText.replace(/\D/g, ''));
        total += priceNumber;
    });

    document.getElementById('total-price').innerText = total.toLocaleString() + ' VND';
}
function updateCartQuantity() {
    let quantity = document.querySelectorAll('#cart-body tr').length;
    document.querySelector('.navbar-cart-quantity').innerText = `(${quantity})`;
}


btnGioHang.forEach(function(button) {
    button.addEventListener('click', function() {
        alert('Đã thêm vào giỏ hàng! lướt lên vào giỏ hàng để xem nhé');
        let product = this.closest('.movie-card');

        let imgSrc = product.querySelector('.card-img').src;
        let priceText = product.querySelector('.gia').innerText;
        let price = parseFloat(priceText.replace(/\D/g, ''));

        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><img src="${imgSrc}" width="80px" height="80px"></td>
            <td class="item-price" data-price="${price}">${price.toLocaleString()} VND</td>
            <td><input type="number" value="1" min="1" class="quantity" style="color:white;"></td>
            <td><button class="remove">Xóa</button></td>
        `;

        document.getElementById('cart-body').appendChild(newRow);

        newRow.querySelector('.quantity').addEventListener('input', function() {
            let quantity = this.value;
            if (quantity < 1) quantity = 1;
            let unitPrice = parseFloat(newRow.querySelector('.item-price').dataset.price);
            let totalPrice = unitPrice * quantity;
            newRow.querySelector('.item-price').innerText = totalPrice.toLocaleString() + ' VND';
            updateTotal();
        });

        newRow.querySelector('.remove').addEventListener('click', function() {
            newRow.remove();
            updateTotal();
            updateCartQuantity();
        });

        updateTotal();
        updateCartQuantity(); // Cập nhật số lượng khi thêm
    })
});

const cartgiohang=document.querySelector('.cart-giohang');
const cartIcon = document.querySelector('.navbar-cart-btn')
cartIcon.addEventListener('click',()=> {
cartgiohang.style.display="flex";
})
const closeCart = document.querySelector('.close-giohang')
closeCart.addEventListener('click',()=> {
    cartgiohang.style.display="none";
})
