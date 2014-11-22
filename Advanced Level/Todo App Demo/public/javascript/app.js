jQuery(function ($) {
	'use strict';
	
	//IE FIX cache issue
	$.ajaxSetup({ cache: false });
			
	var App = {
		
		init: function () {
			/* caching selectors */
			this.$todoList = $("#todolist");
			this.$input = $("#new-todo");
			/* bind the events */
			this.bindEvents();
			App.render();
			
		},
		bindEvents: function () {
			
			$(".add").on('click', this.create);	
			/* delegate to task elements added on */
			this.$todoList.on('click', '.toggle', this.toggle);
			this.$todoList.on('click', '.destroy', this.destroy);
			
		},
		render: function () {
			
			/* called every time a ui refresh happens */
			$.get("/api/store/getTasks",function(data,stat,xhr){ 
				App.$todoList.html(App.template(data.usernamespace));	
			});
			
		},		
		template : function(todos) {
			
			/* render the html using the tasks obtained from storage */
			var html = "";
			for(var i=0;i<todos.length;i++) {
				
				html += '<li class="completed" data-id="'+todos[i].id+'">';
				html += '<button class="toggle" ';
				if(todos[i].completed == "true") {
					html +=  ' data-checked="true" ><i class="fa fa-check-square-o"></i></button><span class="view completed">';
				} else {
					html +=  ' data-checked="false" ><i class="fa fa-square-o"></i></button><span class="view">';
				}
				html += todos[i].title+'</span><button class="destroy"><i class="fa fa-trash"></i></button></li>';
				
			}
			return html;
			
		},
		create: function (e) {
			
			/* create new task */
			if($.trim(App.$input.val()) == "") {
				return false;
			}
			
			var val = App.$input.val();			
			$.post("/api/store/createTask",{item:val},function(data){
				App.$input.val('');
				App.render();
			});
			
		},
		destroy : function(e) {
			
			/* delete task by id */
			var id = $(this).closest('li').data('id');
			
			$.post("/api/store/deleteTask",{id:id},function(data){
				App.render();
			});
			
		
		},
		toggle : function(e) {
			
			/* toggle task status */
			var id = $(this).closest('li').data('id');
			var val = $(this).attr("data-checked") == "true" ? "false" : "true";
			
			$.post("/api/store/completeTask",{id:id,status:val},function(data){
				App.render();
			});
		
		}
		
	};
	
	App.init();

});

