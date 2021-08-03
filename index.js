const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employees = [];

function createEmployeeList() {
  inquirer
    .prompt([
      {
        message: "Employee Name: ",
        name: "name",
      },

      {
        message: "Employee ID: ",
        name: "id",
      },

      {
        message: "Employee E-mail: ",
        name: "email",
      },

      {
        type: "list",
        message: "Please select the employee's title",
        choices: ["Engineer", "Intern", "Manager"],
        name: "title",
      },
    ])

    // is this part of inquire above?

    .then(function ({ name, title, id, email }) {
      let titleInput = "";
      let nameInput = "";
      if (title === "Engineer") {
        titleInput = "What is Engineer's gitHub username?";
        nameInput = "github";
      } else if (title === "Intern") {
        titleInput = "What is the Intern's school name?";
        nameInput = "school";
      } else {
        titleInput = "What is the Manager's office number?";
        nameInput = "officeNumber";
      }
      inquirer
        .prompt([
          {
            message: titleInput,
            name: nameInput,
          },
          {
            type: "confirm",
            name: "createEmployeeList",
            message: "Would you like to add another employee?",
            default: false,
          },
        ])
        .then(function (response) {
          employees.push({ name, title, id, email, ...response });
          if (response.createEmployeeList) {
            createEmployeeList();
          } else {
            let titleInput = "";
            // create for loop over employees array
            for (var i = 0; i < employees.length; i++) {
              console.log(employees[i]);
              let employeeCard = `
              <div class="container">
        <div class="row">
            <div class="col s12 m6">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title"><strong>${employees[i].title}</strong></span>
                            <ul class="title">
                                <li>Name: ${employees[i].name}</li>
                                <li>Email: ${employees[i].email}</li>
                                <li>ID: ${employees[i].id}</li>
                               <li> ${employees[i].title === "Engineer" ? `Github: ${employees[i].github}` : ""}
                                ${employees[i].title === "Intern" ? `School: ${employees[i].school}` : ""}
                                ${employees[i].title === "Manager" ? `Office Number: ${employees[i].officeNumber}` : ""} </li>
                              </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
              fs.appendFile("./output.html", employeeCard, function (err) {
                if (err) {
                  return reject(err);
                }
              });
            }
          }
        });
    });
}
function renderHtml() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- Compiled and minified CSS -->
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
  
      <title>team-profile-generator</title>
  </head>
  
  <body>
      <nav>
          <div class="nav">
              <p>Team Profile</p>
          </div>
      </nav>`;
  fs.writeFile("./output.html", html, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

renderHtml();
createEmployeeList();
