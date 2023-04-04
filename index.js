const {listContacts, getContactById, removeContact, addContact} =require('./contacts-async.js');
// const {listContacts, getContactById, removeContact, addContact} =require('./contacts.js');
const { Command } = require("commander");

// test fnc

// listContacts();
// getContactById('AeHIrLTr6JkxGE6SN-0Rw');
// removeContact('qdggE76Jtbfd9eWJHrssH');
// addContact("Carl Morz", "morz@egetlacus.ca", "(295) 532-6812");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      listContacts()
      break;

    case "get":
      // ... id
      getContactById(id);
      break;

    case "add":
      // ... name email phone
      addContact(name, email, phone)
      break;

    case "remove":
      // ... id
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

console.log('Welcome to my homework!')
