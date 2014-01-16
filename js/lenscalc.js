var actual_height = 100;
var actual_width = 100;

function calcFieldOfView(distance,focal_length,sensor_size)
{
	return Math.round( distance * sensor_size / focal_length  * 100) / 100;
}

function calcHorizontal(distance,focal_length)
{
	var sensorWidth = $('#sensorSize :selected').attr('sensorWidth');
	return calcFieldOfView(distance,focal_length, sensorWidth);
}

function calcVertical(distance,focal_length)
{
	var sensorHeight = $('#sensorSize :selected').attr('sensorHeight');
	return calcFieldOfView(distance,focal_length, sensorHeight);
}

function calcFrame()
{
	distance = $('#distance').val();
	focal_length = $('#focal_length').val();
	vertical = calcVertical(distance, focal_length);
	horizontal = calcHorizontal(distance,focal_length);
	$('#frameHeight').attr("value", vertical);
	$('#frameWidth').attr("value", horizontal);
	scale_new(6/vertical);
}

function scale_picture(scale)
{
	$('#scaler').attr('transform', 'scale(' + scale + ')');
	width = $('#frame').width();
	height = width * 9 / 16;

	actual_width = $('#man')[0].getBoundingClientRect().width;
	actual_height = $('#man')[0].getBoundingClientRect().height;
	x_offset = (width / 2 - (actual_width / 2)) / scale;
	if (actual_height <= height)
	{
		y_offset = (height - actual_height) / scale;
	} else {
		y_offset = (height * 1 * (scale - 1) - actual_height) / scale;
		
	}
	
	$('#man').attr('x', x_offset);
	$('#man').attr('y', y_offset);
}

function scale_new(scale)
{
	if (scale > 0.9)
	{
		centerX = actual_width / 2;
		centerY = -50;
		$('#scaler').attr('transform', 'translate(' + -centerX*(scale-1) + ',' + -centerY*(scale-1) + ')' + 'scale(' + scale + ')');
	} else {
		centerX = actual_width / 2;
		centerY = actual_height;
		$('#scaler').attr('transform', 'translate(' + -centerX*(scale-1) + ',' + -centerY*(scale-1) + ')' + 'scale(' + scale + ')');
	}
	
}

function resize() {
	width = $('#frame').width();
	height = width * 9 / 16;
	$('#frame').height(height);
	console.log()
	$('#svg').attr('width', width);
	$('#svg').attr('height', height);
	$('#svg').find('image').attr('width', width);
	$('#svg').find('image').attr('height', height);
	actual_width = width;
	actual_height = height;
}

$(document).ready(function() {
	$(window).resize(function(){
		resize();
	})
	resize();
	scale_new(.9);
});
