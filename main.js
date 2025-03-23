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
// login
const wrapper=document.querySelector('.wrapper');
const LoginLink=document.querySelector('.login-link');
const registerLink=document.querySelector('.register-link');
const btnPopup=document.querySelector('.btnLogin-popup');
const iconClose=document.querySelector('.icon-close');
registerLink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});
LoginLink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
});
btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});
iconClose.addEventListener('click',()=>{
    wrapper.classList.remove('active-popup');
});
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
