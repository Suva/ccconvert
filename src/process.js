const pdf = require('./pdf.js')

async function processFiles(files) {
    for (let file of files) {
        console.log("Parsing file: ", file)
        let fields = await pdf.getFields(file)
        console.log(fields.reduce((memo, field) => ({...memo, [field.id]: field.value})))
    }
}

module.exports = {processFiles}