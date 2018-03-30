<?php

	function get_content($file,$url,$minutes = 10,$fn = '',$fn_args = '') {
		$current_time = time(); $expire_time = $minutes; $file_time = filemtime($file);

		if(file_exists($file) && ($current_time - $expire_time < $file_time)) {
			return file_get_contents($file);
		}
		else {
			$content = get_url($url);

			// Check for valid url
			if (empty($content)) {
				return file_get_contents($file);
			}
			else if ($fn) {
				$content = $fn($content,$fn_args);
				$content = json_encode($content);
			}
			file_put_contents($file,$content);
			return $content;
		}
	}


	function get_url($url) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,5);
		$content = curl_exec($ch);
		curl_close($ch);
		return $content;
	}


	function extract_data($content,$args) {
		$content = json_decode($content, true);
		return $content;
	}

	$cache_file = 'cache/apartmentdata.txt';
	$data_url = 'http://rentcafe.com/rentcafeapi.aspx?requestType=apartmentavailability&APIToken=NDY5OTI%3d-XDY6KCjhwhg%3d&propertyCode=p0155985';

	$apartments_data = get_content($cache_file, $data_url, 5, 'extract_data',array('file'=>$cache_file));

	print $apartments_data;

?>
