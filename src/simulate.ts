import {dataAnalytics} from './dataAnalytics'

export module simulate{

    function simulate(returns : number[][], weights: number[]){

        var varianceCovarianceMatrix : number[][] = dataAnalytics.buildVarianceCovarianceMatrix(returns)
        var risk : number = dataAnalytics.riskOfPortfolio(varianceCovarianceMatrix, weights).get([0 ,0])

        var expectedReturn : number = dataAnalytics.expectedReturnOfPortfolio(returns, weights)

        var sharpeRatio : number = dataAnalytics.sharpeRatio(risk, expectedReturn)
        return sharpeRatio
    }

    function simulateRepeatedly(returns: number[][], times: number){
        var numberOfStocks = returns.length

        var highestSharpeRatio : number = 0
        var bestWeights : number[] = [numberOfStocks]

        for(var i = 0; i < times; i++){
            var weights: number[] = dataAnalytics.randomlyInitializeWeights(numberOfStocks)
            var sharpeRatio : number = simulate(returns, weights)

            if(sharpeRatio > highestSharpeRatio){
                highestSharpeRatio = sharpeRatio
                bestWeights = weights
            }
        }

        return bestWeights
    }
}