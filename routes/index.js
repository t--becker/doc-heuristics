var express = require('express');
var router = express.Router();
var fs = require('fs');
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

var Doc = require('../model/doc.js');

const DOC_PATH = "./public/docs/confluence";

/* GET home page. */
router.get('/', function(req, res, next) {

  let docset = [];
  //reading directory synchronously
  var files = fs.readdirSync(DOC_PATH);
  //reading files in directory synchronously
  files.forEach(function(file) {


      var contents = fs.readFileSync(DOC_PATH +'/'+ file, 'utf8');

      var html = md.render(contents.toString());
      var doc = new Doc(file, html);
      
      //keeping an array of the docs
      docset.push(doc);

      console.log('Doc name: '+ doc.getName());
      console.log('images: ' + doc.getNumberOfImages());
      console.log('links: ' + doc.getNumberOfLinks());
      console.log('headings: ' + doc.getNumberOfHeadings());
      console.log('tables: ' + doc.getNumberOfTables());
      console.log('paragraphs: ' + doc.getNumberOfParagraphs());
      console.log('code snippets: ' + doc.getNumberOfCodeSamples());
      console.log('Words: '+ doc.getNumberOfWords());
      console.log('=====================');


  })
  var fuck = '';


  res.render('index', { title: 'Documentation Heuristics', poop: 'suckit sista!!' });
});

module.exports = router;
