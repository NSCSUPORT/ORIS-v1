<script>
    // Doughnut Chart (Percentage)
    var doughnutChartData = {
        labels: ["Completed", "Pending"],
        datasets: [{
            data: [86, 14],
            backgroundColor: ["#4CAF50", "#f44336"],
            borderWidth: 0
        }]
    };

    var ctx = document.getElementById('canvas_doughnut4').getContext('2d');
    var doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: doughnutChartData,
        options: {
            responsive: true,
            cutoutPercentage: 70,
            rotation: Math.PI / 4,
            legend: {
                display: false
            },
            animation: {
                animateRotate: true
            }
        }
    });

    // Line Chart
    var lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Revenue',
            fill: false,
            borderColor: "#4CAF50",
            backgroundColor: "#4CAF50",
            borderWidth: 2,
            data: [500, 400, 450, 600, 700, 800]
        }]
    };

    var ctxLine = document.getElementById('canvas_line4').getContext('2d');
    var lineChart = new Chart(ctxLine, {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "#aaa"
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: "#aaa"
                    }
                }]
            },
            legend: {
                position: 'top',
                labels: {
                    fontColor: "#aaa"
                }
            }
        }
    });
</script>
