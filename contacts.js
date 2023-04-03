const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {

  fs.readFile(contactsPath)
    .then(data => console.table(JSON.parse(data)))
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

  fs.readFile(contactsPath)
    .then(data => { const contacts = JSON.parse(data); contacts.push({name, email, phone}); return contacts})
    .then(data => fs.writeFile(contactsPath, JSON.stringify(data)))
    .catch(err => console.log(err.message));

}

module.exports = {
  listContacts: listContacts,
  getContactById: getContactById,
  removeContact: removeContact,
  addContact: addContact,
}

