const inquirer = require('inquirer');
const jest = require('jest');

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the name of the manager?',
      name: 'managerName',
    },
    {
      type: 'input',
      message: 'What is the id number of the manager?',
      name: 'managerId',
    },
    {
      type: 'input',
      message: 'What is the email address of the manager?',
      name: 'managerEmail',
    },
    {
      type: 'input',
      message: 'What is the manager office number?',
      name: 'managerNumber',
    },
    {
      type: 'checkbox',
      message: 'Who else is on your team?',
      name: 'employeeChoice',
      choices: ["Engineer", "Intern","Finish"]
    },
  ])
  .then((response) => {
      console.log(response.managerName);
      console.log(response.managerId);
      console.log(response.managerEmail);
      console.log(response.managerNumber);
      console.log(response.employeeChoice);
  })