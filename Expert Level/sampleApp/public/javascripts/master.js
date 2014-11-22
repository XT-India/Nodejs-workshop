$(document).ready(function() {
	$('.delete').click(function(event) {
		$target = $(event.target);
		$.ajax({
			type: 'GET',
			url: '/task/' + $target.attr('data-task-id'),
			success: function(response) {
				$target.parent().remove();
				alert('Task Deleted');
			},
			error: function(error) {
				alert('Oops !!! there is problem in Deleting Record')
			}
		});
	});
})
