Character Sheet Converter
=========================
Purpose of this software is to convert the fillable PDF 
roleplaying character sheets into XML format used by some apps.
Ideally, the conversion mappings can be created for many formats,
but currently only supported path is:

- D&D Beyond -> GameMaster 5E

If you need mappings for additional formats, please forward me
the sample files with enough data filled to satisfy the needs.

Installation
------------
You need node.js installed. To get it, go to https://nodejs.org/

When installed, run command:

    npm i -g ccconvert

Usage
-----
Usage: ccconvert [options] <file...>

Options:

    -V, --version  output the version number
    -f, --force    Overwrite existing files
    -h, --help     output usage information

Motivation
----------
Unfortunately D&D Beyond, regardless how great it is, does not yet
provide DM tools, such as initiative tracking & combat management,
so I am still relying on other tools such as GM5 to help me along.

This tool allows me to download character sheets from D&D Beyond
and import them to Game Master 5E for playing.

Disclaimer
----------
Wizards of the Coast, Dungeons & Dragons, D&D and their respective logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 2018 Wizards. All Rights Reserved.

This software is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at http://www.wizards.com

