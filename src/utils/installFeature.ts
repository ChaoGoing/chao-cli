import * as shell from 'shelljs';
import { writeFileSync } from 'fs';
import { type PackageJson, printMsg, readJsonFile, writerJsonFile } from './common';
import chalk from 'chalk'

export function installEslint(): void {
  shell.exec(
    'npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D',
  );
  const eslintrc = `module.export = {
    "env": {
      "es2021": true,
      "node": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "rules": {
    }
  };
  

  }
  `;

  try{
    writeFileSync('./.eslintrc.js', eslintrc, { encoding: 'utf-8' })
  }catch(err) {
    printMsg(`${chalk.red('fail to write .eslint.js')}`)
    printMsg(`${chalk.red('add the following content in .eslintrc.js')}`)
    printMsg(`${chalk.red(eslintrc)}`)
  }


  const packageJson = readJsonFile('./package.json')
  packageJson.scripts['eslint'] = "eslint --fix src --ext .ts --max-warnings=0"
  writerJsonFile<PackageJson>('./package.json', packageJson)

}

