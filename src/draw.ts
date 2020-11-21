import Chart from 'chart.js'

//use lodash chunk
export module draw{

    export function drawChart(data : number[]){
        var ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
        data: {
        datasets: [{
            label: '# of Votes',
            data: [1 , 1, 2, -1 , 1, 4, 1, 2, 0],
            
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    }
}