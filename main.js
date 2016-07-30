function getData () {
	return [
		{
			date: new Date('07-16-2016'),
			action: 2,
			location: 'HOME'
		},
		{
			date: new Date('07-19-2016'),
			action: 1,
			location: 'TEMPELHOF'
		},
		{
			date: new Date('07-21-2016'),
			action: 1,
			location: 'HOME'
		},
		{
			date: new Date('07-22-2016'),
			action: 1,
			location: 'HOME'
		},
		{
			date: new Date('07-26-2016'),
			action: 1,
			location: 'HOME'
		},
		{
			date: new Date('07-27-2016'),
			action: 1,
			location: 'HOME'
		},
		{
			date: new Date('07-29-2016'),
			action: 1,
			location: 'CATS’ HOME'
		}
	];
}

var margin = {top: 30, right: 20, bottom: 30, left: 50};
var width = 1024 - margin.left - margin.right;
var height = 460 - margin.top - margin.bottom;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

var svg = d3.select('body')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var xAxis = d3.axisBottom().scale(x);
var yAxis = d3.axisLeft().scale(y).ticks(2);

var valueLine = d3.line()
	.x(function (event) {
		return x(event.date);
	})
	.y(function (event) {
		return y(event.action);
	});

var data = getData();

x.domain([new Date('07-09-2016'), new Date()]);

y.domain([0, d3.max(data, function (event) {
	return event.action;
})]);

var newData = x.ticks(20).map(function (date){
	var foundEvent;

	for (var i = 0; i < data.length; i++){
		if (data[i].date.toString() == date.toString()){
			foundEvent = data[i];
			break;
		}
	}

	return foundEvent || {date: date, action: 0};
});

var tip = document.getElementById('tip');


svg.append('path')
    .attr('class', 'line')
    .attr('d', valueLine(newData));

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

svg.selectAll('dot')
    .data(newData)
	.enter()
	.append('circle')
	.on('mouseover', function (event) {
		if (event.location) {
			tip.innerHTML = event.location;

			tip.classList.add('visible');
			this.classList.add('bigger');

			var coordinates = d3.mouse(this);

			tip.style.left = coordinates[0] + margin.left + 'px';
			tip.style.top = coordinates[1] + margin.top + 'px';
		}
	})
	.on('mouseout', function (event) {
		if (event.location) {
			tip.classList.remove('visible');
			this.classList.remove('bigger');
		}
	})
    .attr('r', 3.5)
    .attr('cx', function (event) {
    	return x(event.date);
    })
    .attr('cy', function(event) {
    	return y(event.action);
    });

document.getElementById('total').innerHTML = data.reduce(function (prec, event) {
	return prec + event.action;
}, 0);
