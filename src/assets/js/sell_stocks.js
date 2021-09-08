async function fetch_stocks() { 
    const rawResponse = await fetch('https://stockmarketapi.tk/stocks', {
        method: 'GET'})
    .then(res => res.json())
    .then(res => {return res});
    return rawResponse;
}

async function load_stocks() {
	let stocks = await fetch_stocks();
	for(let i = 0; i < stocks.length; i++){
		$('#select_stocks').append(`${`<option value=${stocks[i].id}>${stocks[i].name}: USD${stocks[i].sell_price}</option>`}`)
	}
}

async function sell(){
    var stockId = document.getElementById('select_stocks').value;
    var quantity = document.getElementById('quantity').value;
    let user = JSON.parse(localStorage.getItem('current_user'));
    var transaction = {stockType_id: stockId, owner_id: user.id, quantity: quantity};
    (async () => {
    	const rawResponse = await fetch('https://stockmarketapi.tk/sell_stock', {
    		method: 'POST',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaction)
        })
        const content = await rawResponse.json();
    })();

    alert('Your transaction has been carried out successfully');
    
}

document.onload = load_stocks();
