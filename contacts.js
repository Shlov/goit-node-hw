const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

// TODO: задокументувати кожну функцію
function listContacts() {

  fs.readFile(contactsPath)
    .then(data => console.log(JSON.parse(data)))
    .catch(err => console.log(err.message));

}

function getContactById(contactId) {

  fs.readFile(contactsPath)
  .then(data => console.log(JSON.parse(data).filter(item => item.id === contactId)))
  .catch(err => console.log(err.message));

}

function removeContact(contactId) {

  fs.readFile(contactsPath)
    .then(data => JSON.parse(data).filter(contact => contact.id !== contactId))
    .then(data => fs.writeFile(contactsPath, JSON.stringify(data)))
    .catch(err => console.log(err.message));

}

function addContact(name, email, phone) {
  // ...твій код
  fs.appendFile(contactsPath, JSON.stringify({name, email, phone}))
    .catch(err => console.log(err.message));

    // fs.readFile(contactsPath)
    // .then(data => JSON.parse(data))
    // .then(data => fs.appendFile(contactsPath, JSON.stringify(data)))
    // .catch(err => console.log(err.message));
}

module.exports = {
  listContacts: listContacts,
  getContactById: getContactById,
  removeContact: removeContact,
  addContact: addContact,
}




// {
//   "id": "test",
//   "name": "test",
//   "email": "test.ante@vestibul.co.uk",
//   "phone": "(999) 999-3792"
// },