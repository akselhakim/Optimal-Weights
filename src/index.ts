import {apiCall} from './apiCall'

//const url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=KA4TB78PB0MOW2AG";
document.getElementById("click").onclick = start;

async function start(){ 
  var symbol = (<HTMLInputElement>document.getElementById("symbol")).value;
  var jsonRes = await apiCall.makeApiCall(symbol);
  document.getElementById("res").innerHTML = jsonRes.toString();
}
//start();

