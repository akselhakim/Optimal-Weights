export module apiCall{

    const url = "https://www.alphavantage.co/query?";
    const apiKey = "KA4TB78PB0MOW2AG";
    const functionParam = "TIME_SERIES_DAILY_ADJUSTED"
    //var symbol = "IBM"
    const outputSize = "full"

    export async function makeApiCall(symbol : string){
        var finalUrl = url + "function=" + functionParam + "&symbol=" + symbol + "&outputsize=" + outputSize + "&apikey=" + apiKey;

        const response = await fetch(finalUrl);
        const jsonRes = await response.json();
        //console.log(jsonRes['Time Series (Daily)']);
        
        var array = makeJsonArrayOfReturns(jsonRes['Time Series (Daily)']);

        return await jsonRes['Time Series (Daily)'];
    }

    //return array of daily returns as : a[0] = today, a[1] = yesterday ...
    function makeJsonArrayOfReturns(jsonObject : any){
        var returns : number[] = [Object.keys(jsonObject).length - 1];
        for(var i = 0; i < Object.keys(jsonObject).length - 1; i++){
            var keyToday = Object.keys(jsonObject)[i];
            var keyYesterday = Object.keys(jsonObject)[i+1];
            console.log(keyToday);

            var today =  jsonObject[keyToday];
            var yesterday = jsonObject[keyYesterday];

            //+ to cast string into number
            var closed : number = +today['5. adjusted close'] - +yesterday['5. adjusted close'];
            var divident : number = +today['7. dividend amount'] - +yesterday['7. dividend amount'];
            var totalToday : number = closed + divident;
            console.log(totalToday);
            returns[i] = totalToday;
        }

        return returns;
    }

}



