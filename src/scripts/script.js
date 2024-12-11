class Contact {
    constructor(name = "", phone = "") {
        this.name = name;
        this.phone = phone;
    }
    equals(contact) {
        return this.name === contact.name && this.phone === contact.phone;
    }
}

function checkPhone(phone) {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
}

function saveContactsToStorage(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsFromStorage() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    return contacts;
}

function renderContacts(contacts) {
    const contactList = document.getElementById('contact-list-ul');
    contactList.innerHTML = "";
    contacts.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${contact.name}</strong> - ${contact.phone}
            <button onclick="deleteContact(${index})">Borrar</button>
            <button onclick="editContact(${index})">Editar</button>
        `;
        contactList.appendChild(li);
    });
}

function saveContact(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    if (!name || !checkPhone(phone)) {
        alert('Por favor introduce información de contacto válida.');
        return;
    }
    const contacts = loadContactsFromStorage();
    const contact = new Contact(name, phone);
    const editIndex = document.getElementById('contact-id').value;
    if (editIndex !== "") {
        contacts[editIndex] = contact;
    } else {
        contacts.push(contact);
    }
    saveContactsToStorage(contacts);
    renderContacts(contacts);
    document.getElementById('contact-form').reset();
    document.getElementById('contact-id').value = "";
}

function editContact(index) {
    const contacts = loadContactsFromStorage();
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('contact-id').value = index;
}

function deleteContact(index) {
    const contacts = loadContactsFromStorage();
    contacts.splice(index, 1);
    saveContactsToStorage(contacts);
    renderContacts(contacts);
}

function searchContact() {
    const phone = document.getElementById('search-phone').value;
    if (!checkPhone(phone)) {
        alert('Por favor introduce un número de teléfono válido.');
        return;
    }
    const contacts = loadContactsFromStorage();
    const contact = contacts.find(c => c.phone === phone);
    const resultDiv = document.getElementById('search-result');
    resultDiv.innerHTML = "";
    if (contact) {
        resultDiv.innerHTML = `<strong>Encontrado:</strong><br>Nombre: ${contact.name}<br>Teléfono: ${contact.phone}`;
    } else {
        resultDiv.innerHTML = "Contacto no encontrado.";
    }
}

document.getElementById('contact-form').addEventListener('submit', saveContact);
document.getElementById('search-btn').addEventListener('click', searchContact);
renderContacts(loadContactsFromStorage());