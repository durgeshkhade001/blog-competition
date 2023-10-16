
const registerForm = document.querySelector('#register-form');
const formError = document.querySelector('#form-error');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    document.querySelector('#register-form button').innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    function resetRegisterButton() {
        document.querySelector('#register-form button').innerHTML = 'Register 🎫';
    }

    const rollno = document.querySelector('#rollno').value.toUpperCase();
    const password = document.querySelector('#password').value;
    const division = document.querySelector('#division').value;
    const year = document.querySelector('#year').value;
    const branch = document.querySelector('#branch').value;
    const firstName = document.querySelector('#first-name').value;
    const lastName = document.querySelector('#last-name').value;
    const email = document.querySelector('#email').value;

    if (rollno.length != 10) {
        formError.classList.add('display');
        formError.textContent = "Please enter a valid roll number";
        resetRegisterButton();
        return;
    }

    // if (email.endsWith('@vpt.edu.in') == false) {
    //     formError.classList.add('display');
    //     formError.textContent = "Please enter a valid college email";
    //     resetRegisterButton();
    //     return;
    // }

    fetch('/api/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rollno, password, division, year, branch, firstName, lastName, email })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                if(data.error.code == 11000) {
                    formError.classList.add('display');
                    formError.textContent = "User already exists";
                    resetRegisterButton();
                } else {
                    formError.classList.add('display');
                    formError.textContent = "Internal server error";
                    resetRegisterButton();
                }
            } else {
                resetRegisterButton();
                alert("Successfully registered, please check your email for verification");
                document.location.href = '/login';
            }
        })
        .catch(err => {
            console.log(err);
        });
});



const isLoggedIn = localStorage.getItem('usersecret');
if(isLoggedIn) {
    document.location.href = '/dashboard';
}



document.querySelector('body').style.opacity = 1;
