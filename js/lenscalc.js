function calcFieldOfView(distance,focal_length,sensor_size)
{
	return Math.round((2 * distance * Math.atan(Math.atan(sensor_size / (2 * focal_length)))) * 100) / 100;
}

function calcHorizontal(distance,focal_length)
{
	return calcFieldOfView(distance,focal_length, 9.59);
}

function calcVertical(distance,focal_length)
{
	return calcFieldOfView(distance,focal_length, 5.39);
}

function calcFrame()
{
	distance = $('#distance').val();
	focal_length = $('#focal_length').val();
	console.log(distance);
	console.log(focal_length);
	vertical = calcVertical(distance, focal_length);
	horizontal = calcHorizontal(distance,focal_length);
	$('#out').text(horizontal + ' x ' + vertical);
	scale_picture(6/vertical);
}

function scale_picture(scale)
{
	$('#scaler').attr('transform', 'scale(' + scale + ')');

	actual_width = $('#man')[0].getBoundingClientRect().width;
	actual_height = $('#man')[0].getBoundingClientRect().height;
	x_offset = (320 - (actual_width / 2)) / scale;
	if (actual_height <= 360)
	{
		y_offset = (360 - actual_height) / scale;
	} else {
		y_offset = (360 + 350 * (scale - 1) - actual_height) / scale;
		
	}
	
	$('#man').attr('x', x_offset);
	$('#man').attr('y', y_offset);
}

$(document).ready(function() {
	scale_picture(1);
});