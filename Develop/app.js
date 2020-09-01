const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
const { throwError } = require("rxjs");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

var employee = []
function roster() {
    inquirer.prompt([
        {
            type: "list",
            name: "name",
            message: "What do you want to do?",
            choices: ["Add Manager", "Add Intern", "Add Engineer", "Exit Application"]
        }
    ])
        .then(function (response) {
            switch (response.name) {
                case "Add Manager":
                    addManager()
                    break;
                case "Add Engineer":
                    addEngineer()
                    break;
                case "Add Intern":
                    addIntern()
                    break;
                default: exitApp();

            }
        })
}
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Employee Name"
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee Email"
        },
        {
            type: "input",
            name: "id",
            message: "Enter Employee ID"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter Office Number"
        }

    ])
        .then(function (data) {
            var newManager = new Manager(data.name, data.email, data.id, data.officeNumber)
            employee.push(newManager)
            console.log(employee)
            roster()
        })
}
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Employee Name"
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee Email"
        },
        {
            type: "input",
            name: "id",
            message: "Enter Employee ID"
        },
        {
            type: "input",
            name: "github",
            message: "Enter GitHub Account"
        }

    ])
        .then(function (data) {
            var newEngineer = new Manager(data.name, data.email, data.id, data.github)
            employee.push(newEngineer)
            console.log(employee)
            roster()
        })



}
function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Employee Name"
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee Email"
        },
        {
            type: "input",
            name: "id",
            message: "Enter Employee ID"
        },
        {
            type: "input",
            name: "school",
            message: "Enter Your Alma Mater"
        }

    ])
        .then(function (data) {
            var newIntern = new Intern(data.name, data.email, data.id, data.school)
            employee.push(newIntern)
            console.log(employee)
            roster()
        })


}
function exitApp() {


    var showData = render(employee);
    console.log(showData);
    fs.writeFileSync("./index.html", showData, function (error) {
        if (error) throw error
        console.log("rendered!")
        process.exit(0);
    })
}

roster();


