function addGraph(width, height, fname) {

    var x = d3.scaleBand().range([0, width]).padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    var svg = d3.select(".graph").append("svg")
        .attr("width", width + 60)
        .attr("height", height + 60)
        .append("g")
        .attr("transform", "translate(" + 55 + "," + 15 + ")");

    const dummy = d3.csv(`${fname}.csv`);
    dummy.then(function (data) {
        data.forEach(function (d) {
            d.amount = +d.amount;
        });

        x.domain(data.map(function (d) { return d.category; }));
        y.domain([0, d3.max(data, function (d) { return d.amount; })]);

        svg.selectAll(".graphbar")
            .data(data)
            .enter().append("rect")
            .attr("class", "graphbar")
            .attr("x", function (d) { return x(d.category); })
            .attr("width", x.bandwidth())
            .attr("y", function (d) { return y(d.amount); })
            .attr("height", function (d) { return height - y(d.amount); });

        svg.append("g")
            .attr("id", "x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .append("text")
            .attr("y", 35)
            .attr("x", width / 1.7)
            .attr("text-anchor", "end")
            .attr("font-size", "1rem")
            .style("font-family", "Recursive")
            .style("fill", "rgb(32,106,93)")
            .text("Category");

        svg.append("g")
            .attr("id", "y")
            .call(d3.axisLeft(y).tickFormat(function (d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("y", -35)
            .attr("x", -(width / 2.67))
            .attr("transform", "rotate(270)")
            .attr("text-anchor", "end")
            .attr("font-size", "1rem")
            .style("font-family", "Recursive")
            .style("fill", "rgb(32,106,93)")
            .text("Amount");

        if (width < 171) {
            d3.selectAll("#x .tick text")
                .attr("text-anchor", "middle")
                .attr("font-size", "0.5rem")
                .attr("transform", "rotate(-30)");
        }
    });
}
function addStats() {
    const dummy = d3.csv("dummy.csv");
    dummy.then(function (data) {
        data.forEach(function (d) {
            d.amount = +d.amount;
        });
        const stats = document.querySelector('.stats');
        const table = document.createElement('table');
        const thr = document.createElement('tr');
        const thd1 = document.createElement('td');
        thd1.innerHTML = "Category";
        const thd2 = document.createElement('td');
        thd2.innerHTML = "Amount";
        thr.appendChild(thd1);
        thr.appendChild(thd2);
        table.appendChild(thr);
        let total = 0;
        for (var i = 0; i < data.length; i++) {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.innerHTML = data[i].category;
            const td2 = document.createElement('td');
            td2.innerHTML = data[i].amount;
            tr.appendChild(td1);
            tr.appendChild(td2);
            table.appendChild(tr);
            total += data[i].amount
        }
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerHTML = "Total";
        const td2 = document.createElement('td');
        td2.innerHTML = total;
        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
        stats.appendChild(table);
    });
}