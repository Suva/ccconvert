const pdf = require('./pdf.js')
const builder = require('xmlbuilder');
const path = require('path')
const fs = require('fs')

let proficiency = 0;

function createXml(f) {
    const xml = builder.create('characters')
        .att('version', '5')
    const b = xml.ele('pc')

    proficiency = parseInt(f.ProfBonus)

    b.ele('label', f.CharacterName)
    b.ele('name', f.Race_ + ' ' + f.ClassLevel)
    b.ele('level', f.ClassLevel.split(' ').slice(-1)[0])
    // Size ??
    b.ele('ac', f.AC)
    b.ele('hp', f.HPMax + '/' + f.HPMax + ' ('+ f.HDTotal +')')
    b.ele('speed', f.Speed)

    // D&D Beyond PDF generator confuses ability scores with ability modifiers
    b.ele('str', f.STRmod)
    b.ele('dex', f.DEXmod_)
    b.ele('con', f.CONmod)
    b.ele('int', f.INTmod)
    b.ele('wis', f.WISmod)
    b.ele('char', f.CHamod)

    b.ele('save', 'Strength ' + f.ST_Strength)
    b.ele('save', 'Dexterity ' + f.ST_Dexterity)
    b.ele('save', 'Constitution ' + f.ST_Constitution)
    b.ele('save', 'Intelligence ' + f.ST_Intelligence)
    b.ele('save', 'Wisdom ' + f.ST_Wisdom)
    b.ele('save', 'Charisma ' + f.ST_Charisma)

    b.ele('skill', 'Acrobatics ' + f.Acrobatics)
    b.ele('skill', 'Animal handling ' + f.Animal)
    b.ele('skill', 'Arcana ' + f.Arcana)
    b.ele('skill', 'Athletics ' + f.Athletics)
    b.ele('skill', 'Deception ' + f.Deception_)
    b.ele('skill', 'History ' + f.History_)
    b.ele('skill', 'Insight ' + f.Insight)
    b.ele('skill', 'Intimidation ' + f.Intimidation)
    b.ele('skill', 'Investigation ' + f.Investigation_)
    b.ele('skill', 'Medicine ' + f.Medicine)
    b.ele('skill', 'Nature ' + f.Nature)
    b.ele('skill', 'Perception ' + f.Perception_)
    b.ele('skill', 'Performance ' + f.Performance)
    b.ele('skill', 'Persuasion ' + f.Persuasion)
    b.ele('skill', 'Religion ' + f.Religion)
    b.ele('skill', 'Sleight of hand ' + f.SleightofHand)
    b.ele('skill', 'Stealth ' + f.Stealth_)
    b.ele('skill', 'Survival ' + f.Survival)

    b.ele('languages', f.ProficienciesLang.split('\n')[0])

    b.ele('passive', f.Passive)

    return xml.end({pretty: true})
}

function modifier(value) {
    return String(value > 0 ? '+' + value : value)
}

function proficientModifier(baseValue) {
    return modifier(parseInt(baseValue) + proficiency)
}


function createXmlFileName(file) {
    const filePath = path.parse(file);
    delete filePath.base
    filePath.ext = '.xml'
    return path.format(filePath)
}

async function processFiles({args: files, force}) {
    for (let file of files) {
        console.log("Parsing file: ", file)
        let fields = await pdf.getFields(file)
        fields = fields.reduce((memo, field) => ({...memo, [field.id]: field.value}))

        let xml = createXml(fields)
        let xmlFileName = createXmlFileName(file);

        if(fs.existsSync(xmlFileName) && !force) {
            throw new Error('File already exists: ' + xmlFileName + '\nUse -f flag to overwrite existing files.')
        }

        fs.writeFileSync(xmlFileName, xml)
    }
}

module.exports = {processFiles}