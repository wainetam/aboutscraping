var casper = require('casper').create();

function getLinks() {
  // console.log('Nowhere to be seen -- now in the DOM!');
  var links = document.querySelectorAll('h3.r a');
  return Array.prototype.map.call(links, function(e) { // specifies what instance the function is called on
    return e.getAttribute('href'); // getAttribute is JS method
  });
}

var startCasper = function() {
  var links = [];
  var screenshot;
  // casper.start('http://fullstackacademy.com', function() {
  casper.start('http://google.com', function() {
    this.fill('form[action="/search"]', { q: 'fullstack' }, true); // string selector, q is name param
  });

  casper.then(function() {
    // console.log("Seen in Casper!")
    links = this.evaluate(getLinks);
    screenshot = this.capture('lsa.png', {
      top: 0,
      left: 0,
      width: 600,
      height: 600});
  });

  casper.run(function() {
    this.echo(links.length + ' links found:');
    this.echo(' - ' + links.join('\n - '));
    this.exit();
  });

};

startCasper();
