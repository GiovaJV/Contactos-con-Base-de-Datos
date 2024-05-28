const formCreate = document.querySelector('#form-create');
const createInput = document.querySelector('#create-input');
const formLogin = document.querySelector('#form-login');
const inputLogin = document.querySelector('#input-login');
const notificacion = document.querySelector('.notificacion');

formLogin.addEventListener('submit', async e => {
    e.preventDefault();
const response = await fetch('http://localhost:3003/users', { method: 'GET' });
const users = await response.json();
const user = users.find(user => user.username === inputLogin.value);

if (!user) {
    notificacion.innerHTML = 'El usuario no existe';
    notificacion.classList.add('show-notificacion');
    setTimeOut (() => {
 notificacion.classList.remove('show-notificacion');
    }, 3000);
} else {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '../contactos/contactos/contactos.html';
}

});

formCreate.addEventListener('submit', async e => {
    e.preventDefault();
const response = await fetch('http://localhost:3003/users', { method: 'GET' });
const users = await response.json();
const user = users.find(user => user.username === createInput.value);

    if(createInput.value === '') {
    notificacion.innerHTML = 'El usuario no puede estar vacio';
    notificacion.classList.add('show-notificacion');
    setTimeOut (() => {
 notificacion.classList.remove('show-notificacion');
    }, 3000);
    } else if (user) {
        notificacion.innerHTML = 'El usuario ya existe';
    notificacion.classList.add('show-notificacion');
    setTimeOut (() => {
 notificacion.classList.remove('show-notificacion');
    }, 3000);
    } else {
 await fetch('http://localhost:3003/users', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: createInput.value}),
});
notificacion.innerHTML = `Usuario ${createInput.value} ha sido creado`;
notificacion.classList.add('show-notificacion');
setTimeOut (() => {
notificacion.classList.remove('show-notificacion');
}, 3000);
createInput.value ();
    }
});