#!/usr/bin/env node
const program = require('commander')
const fp = require('./src/process')

program
    .version('1.0.0')
    .usage('[options] <file...>')
    .option('-f, --force', 'Overwrite existing files')
    .parse(process.argv)

async function run() {
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    } else {
        try {
            await fp.processFiles(program)
        } catch (error) {
            console.error(error.message)
        }
    }
}

run()
