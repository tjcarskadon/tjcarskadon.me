var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    Handlebars = require('handlebars'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    fs = require('fs');

Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

var plugin = function (files, metalsmith, done) {
  console.log(files);
  done();
};


Metalsmith(__dirname)
  .use(markdown())
  .use(templates('handlebars'))
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
    },
    posts: {
      patter: 'content/posts/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(permalinks({
    pattern: ':collections/:title'
  }))
  .destination('./build')
  .build(function(err) {if(err) console.log(err);});