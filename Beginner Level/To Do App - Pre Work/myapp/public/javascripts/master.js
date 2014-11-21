$(document).ready(function(){
	Todo.init();
});

var Todo = {
	init:function(){
		Todo.attachEvents();
		Todo.showItem();
	},
	attachEvents:function(){
		$("#btnAddTask").on("click",function(){
			Todo.addItem();
		});

		$("#btnClearTask").on("click",function(){
			Todo.clearItem();
		});
	},
	showItem:function(){
		var currentTasks = localStorage.getItem('tasks');
		if(currentTasks != '' && currentTasks != null)
		{
			$.each(currentTasks.split(";"),function(i,val){
				$("#todolist").append("<li> "+val+"</li>");
			});
		}
	},
	addItem:function(){
		var taskName = $("#new-todo").val();
		
		var currentTasks = localStorage.getItem('tasks');
		if(currentTasks != '' && currentTasks != null)
			currentTasks += taskName + ";";
		else
			currentTasks = taskName + ";";
		localStorage.setItem('tasks',currentTasks);
		$("#todolist").append("<li> "+taskName+ "</li>");	
	},
	clearItem:function(){
		localStorage.clear();
		$("#todolist").html('');
	}
};