export module editDocument{

    const colors : string[] = ["#051e3e","#851e3e", "#451e3e", "#251e3e", " #651e3e"]

    export function fillReturns(returns : string, symbol : string, id : number){
        var formattedReturns = returns.replace(/,/g, "\n")

        var mainDiv = document.createElement("div")
        mainDiv.classList.add("stock")
        mainDiv.id = "stock" + id.toString()
        mainDiv.style.backgroundColor = colors[id % colors.length]
        
        var divElement = document.createElement("div")
        divElement.classList.add("ret")
        divElement.id = "return" + id.toString()
        divElement.innerHTML = formattedReturns
    
        var headerElement = document.createElement("h2")
        headerElement.classList.add("sym")
        headerElement.id = "symbol" + id.toString()
        headerElement.innerHTML = symbol
    
        document.getElementById("returns").appendChild(mainDiv)
        document.getElementById(mainDiv.id).appendChild(headerElement)
        document.getElementById(mainDiv.id).appendChild(divElement)
    }


}