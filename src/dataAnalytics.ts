import lodash from 'lodash'
import {matrix, transpose, multiply} from 'mathjs'

export module dataAnalytics{

    const riskFreeRate = 0;
    
    function expectedReturnOfStock(returns : number[]){
        var sum : number = 0;
        for(var i = 0; i < returns.length; i++){
            sum = sum + returns[i];
        }

        return sum / returns.length;
    }

    function varianceOfStock(returns : number[]){
        var sum : number = 0;
        var expectedReturn = expectedReturnOfStock(returns);

        for(var i = 0; i < returns.length; i++){
            var add = (returns[i] - expectedReturn) ** 2;
            sum = sum + add;
        }

        return sum / returns.length
    }

    function riskOfStock(returns : number[]){
        var variance = varianceOfStock(returns)
        return Math.sqrt(variance)
    }

    export function expectedReturnOfPortfolio(returns: number[][], weights: number[]){
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

    function covariance(returns1 : number[], returns2 : number[]){
        //shallow copy?
        var r1 = returns1;
        var r2 = returns2;

        if(r1.length != r2.length){
            if(r1.length > r2.length){
                r1 = lodash.take(r1, r2.length)
            }
            else{
                r2 = lodash.take(r2, r1.length)
            }
        }

        var expectedReturn1 = expectedReturnOfStock(r1)
        var expectedReturn2 = expectedReturnOfStock(r2)

        var sum = 0;
        for(var i = 0; i < r1.length; i++){
            var first = r1[i] - expectedReturn1;
            var second = r2[i] - expectedReturn2;
            sum += (first * second)
        }
        return sum / r1.length
    }

    export function buildVarianceCovarianceMatrix(returns : number[][]){
        var num : number = returns.length;
        var matrix : number[][] = [];

        //build matrix
        for(var i = 0; i < num; i++){
            var arr : number[] = [num]
            matrix[i] = arr; 
        }

        for(var i = 0; i < num; i++){
            for(var j = 0; j < num; j++){
                if(i == j){
                    matrix[i][j] = varianceOfStock(returns[i])
                }
                else{
                    matrix[i][j] = covariance(returns[i], returns[j])
                }
            }
        }

        return matrix
    }

    export function riskOfPortfolio(varinaceCovarianceMatrix: number[][], weights: number[]){
        if(varinaceCovarianceMatrix.length != weights.length){
            throw("size of variance covariance matrix and weights vector don't match")
        }

        var w = matrix([weights])
        var wTranspose = transpose(w)

        var first = multiply(wTranspose, varinaceCovarianceMatrix)

        return multiply(first, w)
    }

    export function sharpeRatio(riskOfPortfolio : number, expectedReturnOfPortfolio : number){
        return (expectedReturnOfPortfolio - riskFreeRate) / riskOfPortfolio
    }

    export function randomlyInitializeWeights(numberOfAssets : number){
        var weights = [numberOfAssets]
        var length = 0;

        for(var i = 0; i < numberOfAssets; i++){
            var value = Math.random()
            weights[i] = value
            length += value ** 2
        }

        length = Math.sqrt(length)
        for(var i = 0; i < numberOfAssets; i++){
            weights[i] = weights[i] / length
        }

        return weights
    }
}