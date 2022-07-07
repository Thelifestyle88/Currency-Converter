
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementKZT = document.querySelector('[data-value="KZT"]')
const elementAMD = document.querySelector('[data-value="AMD"]')
const rub = {
    RUB: {
        "ID": "R000001",
        "NumCode": "999",
        "CharCode": "RUB",
        "Nominal": 1,
        "Name": "Российский рубль",
        "Value": 1,
        "Previous": 1
    }
}
getCurrencies()
const input = document.querySelector('#input')
const output = document.querySelector('#output')
const inputSelect = document.querySelector('#select-input')
const outputSelect = document.querySelector('#select-output')
async function getCurrencies(dataCurrencies) {
    let response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    const json = await response.json()
    const result = await json
    dataCurrencies = result.Valute
    elementUSD.textContent = dataCurrencies.USD.Value.toFixed(2)
    elementEUR.textContent = dataCurrencies.EUR.Value.toFixed(2)
    elementKZT.textContent = (dataCurrencies.KZT.Value / dataCurrencies.KZT.Nominal).toFixed(2)
    elementAMD.textContent = (dataCurrencies.AMD.Value / dataCurrencies.AMD.Nominal).toFixed(2)
    if (dataCurrencies.USD.Value <= dataCurrencies.USD.Previous) {
        elementUSD.classList.add('up')
    } else {
        elementUSD.classList.add('down')
    }
    if (dataCurrencies.EUR.Value <= dataCurrencies.EUR.Previous) {
        elementEUR.classList.add('up')
    } else {
        elementEUR.classList.add('down')
    }
    if (dataCurrencies.KZT.Value <= dataCurrencies.KZT.Previous) {
        elementKZT.classList.add('up')
    } else {
        elementKZT.classList.add('down')
    }
    if (dataCurrencies.AMD.Value <= dataCurrencies.AMD.Previous) {
        elementAMD.classList.add('up')
    } else {
        elementAMD.classList.add('down')
    }
    const finalCurrencies = JSON.parse(JSON.stringify(dataCurrencies))
    finalCurrencies.RUB = {
        "ID": "R000001",
        "NumCode": "999",
        "CharCode": "RUB",
        "Nominal": 1,
        "Name": "Российский рубль",
        "Value": 1,
        "Previous": 1
    }
    function convertValue() {
        output.value = parseFloat(input.value) / finalCurrencies[outputSelect.value].Value.toFixed(2) * finalCurrencies[inputSelect.value].Value.toFixed(2) * finalCurrencies[outputSelect.value].Nominal / finalCurrencies[inputSelect.value].Nominal
    }
    input.oninput = convertValue
    inputSelect.oninput = convertValue
    outputSelect.oninput = convertValue
}



