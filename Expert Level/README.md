<h3>Expert Level</h3>
===========================
<h4>We will be covering below topics in this level</h4>
<ol>
<li>MongoDB</li>
<li>MongoDB Installation</li>
<li>Bringout modularity</li>
<li>Writing maintainable and reusable code</li>
<li>Providing encapsulation</li>
</ol>
  
<h4>What does Revealing Prototype Pattern do?</h4>
<ol>
<li>“Modularize” code into re-useable objects</li>
<li>Variables/functions taken out of global namespace</li>
<li>Provides encapsulation</li>
<li>Exposes only plublic methods</li>
<li>Unlike the modular pattern , function loaded into memory once</li>
<li>Possible to “override” functions through prototyping</li>
<li>Extensible</li>
</ol>

<h4>Pattern Structure Overview</h4>
<pre>
function Table(options) {
//variables defined here
};
Table.prototype = function() {
//functions defined here
return { //public members defined here  };
}();
</pre>

<h4>Pattern Structure Review</h4>
<pre>
   // cunstructor function
    function TableSelector(ele , options) {
            // cache the jquery selector , so that can access the variable accorss the comp
            this.$ele = $(arguments[0]);
            this.config = $.extend( arguments[1] , {$ele : this.$ele});
        };

    TableSelector.prototype = function() {
      var init = function() {
                addEvents.call(this);
            },
         
         // register all the events in this function so that easiar to maintain the code
         addEvents = function() {
            // Event Listeners for the cell -  click , mouseenter , mouseleave
            this.$ele.on(
                {
                    click : handler ,
                    mouseenter : handler
                } , '.data' );
         },
         
         handler = function(e) {
                e.preventDefault();
               // do some thing .....
                e.stopPropagation();
            };

        // adding visibility - reveal or give public access to methods that we need to invoke
        return {
           init : init
        }
    }();
    
    new TableSelector("#id",options).init();
</pre>



  
  
