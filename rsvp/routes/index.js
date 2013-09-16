
/*
 * SUBMIT RSVP
 */
 exports.submit = function(req, res){
   console.log(req.body);
   //Currently we rename the file based on the title. Every Time.
   /*var title = req.body.recipe.title;
   var datetime = req.body.recipe.datetime;
   var categoriesArray = req.body.recipe.categories;
   var ingredientsArray = req.body.recipe.ingredients;
   var directionsArray = req.body.recipe.directions;

   var date = datetime.substring(0, 10);
   var name = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\ /g,'-');


   var md  = '---\n';
       md += 'layout: post\n';
       md += 'title: '+ title +'\n';
       md += 'date: '+ datetime +'\n';
       md += 'categories:';
       categoriesArray.forEach(function(category){
         md += ' ' + category;
       });
       md +='\n';
       md += '---';
       md += '\n';
       md += '{% contentfor ingredients %}\n';
       ingredientsArray.forEach(function(ingredient){
         md += '- ' + ingredient + '\n';
       });
       md += '{% endcontentfor %}\n';
       md += '\n';
       md += '{% contentfor directions %}\n';
       var i = 1;
       directionsArray.forEach(function(direction){
         md += i + '. ' +  direction + '\n';
         i = i + 1;
       });
   */
   //res.redirect("/");
 };