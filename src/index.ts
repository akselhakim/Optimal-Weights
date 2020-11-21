import {apiCall} from './apiCall'
import {Chart} from 'chart.js'
// ///<reference path="../node_modules/@types/chart.js"/>


//const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=KA4TB78PB0MOW2AG";
document.getElementById("click").onclick = start;
document.getElementById("add").onclick = add;

var ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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

var ul = document.getElementById("stocks").children;
(<HTMLButtonElement>document.getElementById("click")).disabled = true;

async function start(){ 
  var returnArrays = [];
  for(var i = 0; i < ul.length; i++){
    var symbol = ul[i].innerHTML;
    var returns : number[] = await apiCall.makeApiCall(symbol);
    document.getElementById("res").innerHTML = returns.toString();
    returnArrays[i] = returns;
  }

  analytics(returnArrays)
}

function add(){
  var ul = document.getElementById("stocks");
  
  var listElement = document.createElement("li");
  var symbol = (<HTMLInputElement>document.getElementById("symbol")).value;

  listElement.appendChild(document.createTextNode(symbol));
  ul.append(listElement);

  if(document.getElementById("stocks").children.length > 0){
    (<HTMLButtonElement>document.getElementById("click")).disabled = false;
  }
}

function analytics(returnArrays : number[][]){

}
//start();

