#!/usr/bin/env node
const program = require('commander')
const fp = require('./src/process')

program
    .version('0.1.0')
    .usage('[options] <file...>')
    .parse(process.argv)

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    fp.processFiles(program.args)
}
