function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    /* Loop through a collection of all HTML elements: */
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("loadhtml");
        if (file) {
            Object.keys(moduleList).map(
                (key) => {
                    if(key===file)
                    elmnt.innerHTML = moduleList[key];
                }
            )
        }
    }
}
const moduleList = {};

moduleList.nav = `
    <a href="../../index.html" class="link_logo">
        <img class= "logo" src="../assets/imgs/logo_transparent.png" alt="logo">
    </a>
    <a href="log_in.html"><button class="log_in">Login</button></a>
    <a href="sign_up.html"><button class="sign_up">Sign Up</button></a>
`
moduleList.navloged = `
    <nav class="navbar"  id="navloged">
        <a href="index loged.html" class="link_logo">
            <img class= "logo" src="../assets/imgs/logo_transparent.png" alt="logo">
        </a>    
        <ul class="navbar_items">
            <li class="navbar_item">
                <a href="buy_stocks.html" class="navbar_link">Buy Stocks</a>
            </li>
            <li class="navbar_item">
                <a href="sell_stocks.html" class="navbar_link">Sell Stocks</a>
            </li>
            <li class="navbar_item">
                <a href="my_stocks.html" class="navbar_link">My Stocks</a>
            </li>
            <li class="navbar_item">
                <a href="my_transactions.html" class="navbar_link">My Transactions</a>
            </li>
        </ul>
        <a href="../../index.html"><button class="log_out">Logout</button></a>
    </nav>
`

window.onload = includeHTML();
