
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index',{
  						"books":[
  								 {"name" : "Adventure of Sherlock Holmes","price" : "$12.99"},
  								 {"name" : "The fault in our Stars","price" : "$12.99"},
  								 {"name" : "Eat Pray Love","price" : "$12.99"}
  							    ]
  });
};