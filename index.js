const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
        type: "input",
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Select a license that applies to you. If none, simply press "Enter"',
        choices: ['![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)', 
                  '![License: WTFPL]( https://img.shields.io/badge/License-WTFPL-brightgreen.svg)',
                  '![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)',
                  '![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)',
                  '![License: (https://img.shields.io/badge/License-Apache%202.0-blue.svg)',
                  '',
                 ]
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please write a brief description of your project.',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'How is this program installed?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'How is this project used?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Who helped with this project?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter your Test links here',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your contact link for any questions or concerns',
    },
  ]);
};

const generateReadMe = (answers) =>
` 
# ${answers.title}

${answers.license}

> ## *Table of Contents*
* [Description](#description)
* [Installation Guide](#installation)
* [Usage](#usage)
* [Contributers](#contributing)
* [Tests](#tests)
* [Questions or Concerns](#questions)

> ## *Description*
    ${answers.description}
> ## *Installation Guide*
    ${answers.installation}
> ## *Usage*
    ${answers.usage}
> ## *Contributers*
    ${answers.contributing}
> ## *Tests*
    ${answers.tests}
> ## *Questions*
    ${answers.questions}

`
    


// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('README.md', generateReadMe(answers)))
    .then(() => console.log('Successfully created README.md'))
    .catch((err) => console.error(err));
};

init();
