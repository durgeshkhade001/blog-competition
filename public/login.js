function contacttoresetpass() {
    alert("Please contact to admin to reset your password (7620753607)")
}

const loginForm = document.querySelector('#login-form');
const formError = document.querySelector('#form-error');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const rollno = document.querySelector('#rollno').value.toUpperCase();
    const password = document.querySelector('#password').value;

    if (rollno.length != 10) {
        formError.classList.add('display');
        formError.textContent = "Please enter a valid roll number";
        return;
    }

    fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rollno, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                formError.classList.add('display');
                formError.textContent = data.error.message;
            } else {
                localStorage.setItem('usersecret', data.usersecret);
                window.location.href = "dashboard";
            }
        })
        .catch(err => {
            console.log(err);
        });
});




document.querySelector('body').style.opacity = 1;