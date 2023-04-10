const fs = require('fs').promises;
const path = require('path');
const {nanoid} = require('nanoid');
const chalk = require("chalk");

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    return console.table(JSON.parse(await fs.readFile(contactsPath)));
  } catch (err) {
    console.log(chalk.red(`Error! ${err.message}`));
  }
}

async function getContactById(contactId) {
  try {
    const searchedContact = JSON.parse(await fs.readFile(contactsPath)).find(contact => contact.id === contactId);
    if (searchedContact) {
      return console.log(searchedContact);
    }
    console.log(chalk.yellow(`Contact not find`));
  } catch (err) {
    console.log(chalk.red(`Error! ${err.message}`));
  }
}

async function removeContact(contactId) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath))
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    if (contacts.length === updatedContacts.length + 1) {
      return console.log(chalk.green(`Success The contact with this id ${contactId} has been deleted`));
    }
    console.log(chalk.yellow(`Contact with this ID was not found`));
  } catch (err) {
    console.log(chalk.red(`Error! ${err.message}`));
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const updatedContacts = [...contacts, {id: nanoid(), name, email, phone}];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    if (contacts.length + 1 === updatedContacts.length) {
      return console.log(chalk.green(`Success Contact ${name} added`));
    }
  } catch (error) {
    console.log(chalk.red(`Error! ${err.message}`));
  }
}


module.exports = {
  listContacts: listContacts,
  getContactById: getContactById,
  removeContact: removeContact,
  addContact: addContact,
}

