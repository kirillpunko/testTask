/*menu*/
const menuOpen = document.getElementById("burger-menu");
const menuClose = document.getElementById("nav-close");
const blur = document.getElementById("blur");
const navBlock = document.getElementById("nav-block");
const navLinks = document.querySelectorAll(".nav-item-link");
menuOpen.addEventListener("click", ()=>{
    navBlock.classList.add('active');
    blur.classList.add('active');
})
menuClose.addEventListener("click",()=>{
    navBlock.classList.remove('active');
    blur.classList.remove('active');
})
blur.addEventListener("click", ()=>{
    navBlock.classList.remove('active');
    blur.classList.remove('active');
})
document.addEventListener("click",(e)=>{
    navLinks.forEach((link)=>{
        if (e.target==link){
            navBlock.classList.remove('active');
            blur.classList.remove('active');
        }
    })
})

/* form validation and send data*/
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelectorAll('.not-correct').forEach(el => el.remove());
    let isValid = true;

    //check name
    const nameField = document.getElementById('name');
    if (nameField.value.trim() === '') {
        isValid = false;
        showError(nameField, 'Пожалуйста, введите ваше имя.');
    }

    //check email
    const emailField = document.getElementById('email');
    if (emailField.value.trim() === '') {
        isValid = false;
        showError(emailField, 'Пожалуйста, введите вашу почту.');
    } else if (!validateEmail(emailField.value.trim())) {
        isValid = false;
        showError(emailField, 'Пожалуйста, введите корректный адрес электронной почты.');
    }

    //check checkbox
    const checkboxField = document.getElementById('checkbox');
    if (!checkboxField.checked) {
        isValid = false;
        showError(checkboxField, 'Вы должны согласиться с политикой конфиденциальности.');
    }

    //check textarea
    const textField = document.getElementById('message');
    if (textField.value.trim() === '') {
        isValid = false;
        showError(textField, 'Пожалуйста, введите сообщение.');
    }

    //send form
    if (isValid) {
        const formData = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            message: document.getElementById('message').value.trim(),
            checkbox: checkboxField.checked
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'not-correct';
    error.textContent = message;
    input.parentElement.appendChild(error);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}