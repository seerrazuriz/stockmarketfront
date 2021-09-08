async function fetch_stocks() { 
    let user = JSON.parse(localStorage.getItem('current_user'));
    const rawResponse = await fetch(`https://stockmarketapi.tk/my_stocks/${user.id}`, {
        method: 'GET'})
    .then(res => res.json())
    .then(res => {return res});
    return rawResponse;
}

async function load_stocks() {
	let stocks = await fetch_stocks();
    let keys = Object.keys(stocks);
	for(let i = 0; i < keys.length; i++){
		$('#my_stocksSelection').append(`${`<option value="">${keys[i]}: ${stocks[keys[i]]} units</option>`}`)
	}
}

document.onload = load_stocks();
