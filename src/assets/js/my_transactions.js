async function fetch_transactions() { 
    let user = JSON.parse(localStorage.getItem('current_user'));
    const rawResponse = await fetch(`http://stockmarketapi.tk/my_transactions/${user.id}`, {
        method: 'GET'})
    .then(res => res.json())
    .then(res => {return res});
    return rawResponse;
}

async function load_transactions() {
	let transactions = await fetch_transactions();
    console.log(transactions[0])
    let transactions_div = $('#transactions_text');
    transactions.forEach(transaction => {
        let id = document.createElement('h6');
        id.innerText = `Transaction id: ${transaction.id}`;
        let name = document.createElement('h6');
        name.innerText = `Stock Name: ${transaction.stockType_id}`;
        let transaction_type = document.createElement('h6');
        transaction_type.innerText = `Transaction Type: ${transaction.transaction_type}`;
        let price = document.createElement('h6');
        price.innerText = `Transaction Price: ${transaction.price}`;
        let quantity = document.createElement('h6');
        quantity.innerText = `Quantity: ${transaction.quantity}`;
        let time_created = document.createElement('h6');
        time_created.innerText = `Timestamp: ${transaction.time_created}`;
        let br = document.createElement('br');
        transactions_div.append(id);
        transactions_div.append(name);
        transactions_div.append(transaction_type);
        transactions_div.append(price);
        transactions_div.append(quantity);
        transactions_div.append(time_created);
        transactions_div.append(br);
  });
}

document.onload = load_transactions();
