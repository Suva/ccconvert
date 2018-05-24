let fs = require('fs')
let PDFParser = require('pdf2json');
let pdfParser = new PDFParser();

function getFields(file) {
    return new Promise((resolve, reject) => {
        pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            resolve(pdfParser.getAllFieldsTypes());
        });

        pdfParser.loadPDF(file);
    })
}

module.exports = {
    getFields
}