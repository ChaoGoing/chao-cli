import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import * as clear from 'clear-console'

export interface PackageJson {
  name: string
  version: string
  description: string
  scripts: {
    [key: string]: string
  }
}

export interface JSON{
  [key: string]: unknown
}

export function readJsonFile(filename: string) {
  return JSON.parse(readFileSync(filename, { encoding: 'utf-8', flag: 'r' }))
}

export function writerJsonFile<T>(filename: string, content: T): void {
  writeFileSync(filename, JSON.stringify(content))
}

export function getProjectPath(projectName: string): string{
  return resolve(process.cwd(), projectName)
}

export function printMsg(msg: string) {
  console.log(msg)
}

export function clearConsole(): void{
  clear()
}