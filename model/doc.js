'use strict';

//this is where all the processing happens.
//not sure if this is the right way to do it, as this is combining the data model and the business logic which is a no-no
//but fuck it! Ain't nobody got time for that!

var cheerio = require('cheerio');
//base cheerio is kind of weak and hard to select stuff with
//thus need advanced cheerio
var cheerioAdv = require('cheerio-advanced-selectors');
cheerio = cheerioAdv.wrap(cheerio);

var wordCount = require('html-word-count'); 

class Document{

    constructor(name, html){
        this.name = name;
        this.html = html;
        this.$ = cheerio.load(html);
    }

    getName(){
        return this.name;
    }

    getNumberOfTables(){
        return this.$('table').length;
    }

    getNumberOfWords(){
        return wordCount(this.html);
    }

    getNumberOfCodeSamples(){
        return this.$('code').length;
    }

    getNumberOfParagraphs(){
        return this.$('p').length;

    }

    getNumberOfHeadings(){
        return this.$('h1, h2, h3, h4, h5, h6').length;
    }

    getNumberOfLinks(){
        return this.$('a').length;
    }

    getNumberOfImages(){
        return this.$('img').length;
    }

    getNumberOfSteps(){
        return this.$('ol li').length;
    }

    getReadabilityScore(){

    }

}
module.exports = Document;