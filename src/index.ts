import {apiCall} from './apiCall'
import {draw} from './draw'
import Chart from 'chart.js'
import mathjs from 'mathjs'

//const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=KA4TB78PB0MOW2AG";
document.getElementById("click").onclick = start;
document.getElementById("add").onclick = add;

var ul = document.getElementById("stocks").children;
(<HTMLButtonElement>document.getElementById("click")).disabled = true;

async function start(){ 
  var returnArrays = [];
  for(var i = 0; i < ul.length; i++){
    var symbol = ul[i].innerHTML;
    var returns : number[] = await apiCall.makeApiCall(symbol);
    document.getElementById("res").innerHTML = returns.toString();
    returnArrays[i] = returns;
    //draw.drawChart(returns);
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

