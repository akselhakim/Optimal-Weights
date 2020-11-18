export module apiCall{

    const url = "https://www.alphavantage.co/query?";
    const apiKey = "KA4TB78PB0MOW2AG";
    const functionParam = "TIME_SERIES_DAILY_ADJUSTED"
    //var symbol = "IBM"
    const outputSize = "full"

    export async function makeApiCall(symbol : string){
        var finalUrl = url + "function=" + functionParam + "&symbol=" + symbol + "&outputsize=" + outputSize + "&apikey=" + apiKey;

        const response = await fetch(finalUrl);
        const jsonRes = await response.text();
        return await jsonRes;
    }

    // function makeJsonArray(jsonObject : ){

    // }

}



