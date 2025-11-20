
const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_bar");

const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = "block";
})


closeBtn.addEventListener('click', () => {
    sideMenu.style.display = "none";
})


themeToggler.addEventListener('click', () => {

    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})


function showMenuOnLargeScreens() {
    sideMenu.style.display = "block";
}


if (window.matchMedia("(max-width: 786px)").matches) {
    showMenuOnSmallScreens();
} else {
    showMenuOnLargeScreens();
}


window.addEventListener('resize', function () {
    if (window.innerWidth <= 786) {
        showMenuOnSmallScreens();
    } else {
        showMenuOnLargeScreens();
    }
});


function renderLineChart(data) {

    var myChart = echarts.init(document.getElementById('lineChart'));

    var monthMap = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    };
    var dates = data.map(function (item) {
        var monthNumber = parseInt(item.finishDate);
        return monthMap[monthNumber];
    });
    console.log(dates)
    var sales = data.map(function (item) {
        return item.totalNum;
    });

    var option = {
        title: {
            text: 'Sales Analysis',

        },
        xAxis: {
            type: 'category',
            data: dates
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: sales,
            type: 'line'
        }]
    };

    myChart.setOption(option);
}


function renderBarChart(data) {

    var myChart = echarts.init(document.getElementById('barChart'));

    var top3Data = data.slice(0, 3).map(function (item) {
        return {
            name: item.name,
            quantity: item.quantity
        };
    });

    var xAxisData = top3Data.map(function (item) {
        return item.name;
    });
    var seriesData = top3Data.map(function (item) {
        return item.quantity;
    });
    console.log(xAxisData)

    var option = {
        title: {
            text: 'Top 3 Dishes Sales'
        },
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: seriesData,
            type: 'bar'
        }]
    };

    myChart.setOption(option);
}


$(document).ready(function () {
    $.ajax({
        url: "http://localhost:8080/api/dishOrData",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#TotalSales").text("$" + data.turnover);
            $("#Expenses").text("$" + data.totalNum);
            $("#Income").text("$" + data.income);
        },
        error: function (xhr, status, error) {
            console.error("Error: Unable to fetch data from the API.");
        }
    });
    $.ajax({
        url: "http://localhost:8080/api/report1",
        type: "GET",
        dataType: "json",
        success: function (data) {
            renderLineChart(data);
        },
        error: function (xhr, status, error) {
            console.error("Error: Unable to fetch data from the API.");
        }
    });
    $.ajax({
        url: "http://localhost:8080/api/report2",
        type: "GET",
        dataType: "json",
        success: function (data) {
            renderBarChart(data);
        },
        error: function (xhr, status, error) {
            console.error("Error: Unable to fetch data from the API.");
        }
    });
});
