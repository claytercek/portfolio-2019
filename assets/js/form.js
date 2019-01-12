$ = require("jQuery");

function init() {
	var is_sending = false,
		failure_message = "Whoops, looks like there was a problem. Please try again later.";

	$(".c-form").submit(function(e) {
		if (is_sending || !validateInputs()) {
			return false; // Don't let someone submit the form while it is in-progress...
		}
		e.preventDefault(); // Prevent the default form submit
		var $this = $(this); // Cache this
		console.log($this.serialize());
		$.ajax({
			url: my_ajax_object.ajax_url, // Let WordPress figure this url out...
			type: "post",
			dataType: "JSON", // Set this so we don't need to decode the response...
			data: $this.serialize(), // One-liner form data prep...
			beforeSend: function() {
				is_sending = true;
				console.log("sending");
				// You could do an animation here...
			},
			error: function(data) {
				console.log(data);
				handleFormError();
			},
			success: function(data) {
				if (data.status === "success") {
					console.log(data);
					success();
					// Here, you could trigger a success message
				} else {
					console.log(data);
					handleFormError(); // If we don't get the expected response, it's an error...
				}
			}
		});
	});

	function handleFormError() {
		is_sending = false; // Reset the is_sending var so they can try again...
		alert(failure_message);
	}

	function validateInputs() {
		var $name = $('.c-form > input[name="name"]').val(),
			$email = $('.c-form > input[name="email"]').val(),
			$message = $(".c-form > textarea").val();
		if (!$name || !$email || !$message) {
			alert("Before sending, please make sure to provide your name, email, and message.");
			return false;
		}
		return true;
  }
  
  function success() {
    $(".c-form").addClass("success");
  }
}

export { init };
