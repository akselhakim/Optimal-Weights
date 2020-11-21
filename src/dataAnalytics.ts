export module dataAnalytics{
    
    function expectedReturnOfStock(returns : number[]){
        var sum : number = 0;
        for(var i = 0; i < returns.length; i++){
            sum = sum + returns[i];
        }

        return sum / returns.length;
    }

    function riskOfStock(returns : number[]){
        var sum : number = 0;
        var expectedReturn = expectedReturnOfStock(returns);

        for(var i = 0; i < returns.length; i++){
            var add = (returns[i] - expectedReturn) ** 2;
            sum = sum + add;
        }

        var variance = sum / returns.length
        return Math.sqrt(variance)
    }

    function expectedReturnOfPortfolio(returns: number[][], weights: number[]){
        if(returns.length != weights.length){
            throw "weights length and returns length are not equal";
        }
        //can check if sum of weights are 1

        var numberOfStocks: number = weights.length
        var expectedOfEachStock : number[] = [numberOfStocks];
        for(var i = 0; i < numberOfStocks; i++){
            expectedOfEachStock[i] = expectedReturnOfStock(returns[i]) * weights[i];
        }

        var sum = 0;
        for(var i = 0; i < expectedOfEachStock.length; i++){
            sum = sum + expectedOfEachStock[i];
        }
        
        return sum;
    }

    
}