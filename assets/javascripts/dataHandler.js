(function ($, root, undefined) {

	$(document).ready(function(){

		function beds_number($number) {
			var $n = Math.floor(Number($number));

			if($n == 0) {
				$n = $n.toString();
				$number = 'Studio';
				return $number;
			} else if($n > 0){
				$number = $n.toString()
				return $number
			}
		}

		function baths_number($number) {
			var $n = Number($number);

			if($n == 1) {
				$number = $n.toFixed(0);
				return $number;
			}
			else if ($number >= 1) {
				$number = $n.toFixed(1);
				return $number;
			}
		}

		var $url = "data_handler.php";

		$.ajax({
			type: 'GET',
	    url: $url,
	    dataType: 'json',

	    success: function(data) {
	      for (var i = 0; i < data.length; i++) {
		      var $apt_name = data[i].ApartmentName,
							$beds = data[i].Beds,
							$baths = data[i].Baths,
							$floor_plan = data[i].FloorplanName,
							$min_range = data[i].MinimumRent,
							$max_range = data[i].MaximumRent,
							$apt_link = data[i].ApplyOnlineURL;

					$beds = beds_number($beds);
					$baths = baths_number($baths);
					$min_range = $min_range.split('.')[0].trim();
					$max_range = $max_range.split('.')[0].trim();
					$range = '$' + $min_range + ' - ' + $max_range;


		      $(".apartments").append('<li><ul class="row">'+'<li class="cell">' +$apt_name+ '</li> ' + '<li class="cell">'+$beds+'</li> ' + '<li class="cell">'+$baths+'</li>' + '<li class="cell">'+$floor_plan+'</li>' +'<li class="cell">'+$range+'</li> ' + '<li class="cell"><a href='+$apt_link+' target="_blank">Apply</a></li>'+'</ul></li>');
	    	}
	    },

	    error: function() {
	      alert("Something is wrong with your data");
	    }
	  });

	})


})(jQuery, this);
