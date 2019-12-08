const shop = (function () {
    let beerCount = 100;
    let vineCount = 50;
    let pepsiCount = 80;
    let beerPrice = 25;
    let vinePrice = 120;
    let pepsiPrice = 20;
    let balance = 1000;
    let order = 0
    function initialBalance() {
        return balance
    }
    function initialCountBeer() {
        return beerCount
    }
    function initialCountVine() {
        return vineCount
    }
    function initialCountPepsi() {
        return pepsiCount
    }
    function beerSell(count) {
        beerCount -= count;
        balance += beerPrice * count;
        order += beerPrice * count;
        return beerCount
    }
    function vineSell(count) {
        vineCount -= count;
        balance += vinePrice * count;
        order += vinePrice * count;
        return vineCount
    }
    function pepsiSell(count) {
        pepsiCount -= count;
        balance += pepsiPrice * count;
        order += pepsiPrice * count;
        return pepsiCount
    }

    function balanceTotal() {
        return balance
    }
    function orderTotal() {
        return order
    }
    return {
        initialBalance: initialBalance,
        initialCountBeer: initialCountBeer,
        initialCountVine: initialCountVine,
        initialCountPepsi: initialCountPepsi,
        beerSell: beerSell,
        vineSell: vineSell,
        pepsiSell: pepsiSell,
        balanceTotal: balanceTotal,
        orderTotal: orderTotal,
    }
}())




let itemsForm = document.forms['items-form'];
let orderForm = document.forms['order-form'];
const getId = id => document.getElementById(id);
let itemsOfder = [
    {
        name: 'Пиво',
        orderCount: 0

    },
    {
        name: 'Вино',
        orderCount: 0

    },
    {
        name: 'Пепсі',
        orderCount: 0

    }

]
function buyItems(index, itemsCount) {
    itemsOfder[index].orderCount += itemsCount
    return itemsOfder[index].orderCount
}

itemsForm[0].value = shop.initialBalance() + ' грн.';
itemsForm[1].value = shop.initialCountBeer() + ' шт.';
itemsForm[2].value = shop.initialCountVine() + ' шт.';
itemsForm[3].value = shop.initialCountPepsi() + ' шт.'


orderForm.addBtn.addEventListener('click', function () {
    let count = orderForm[0].value
    if (orderForm[1].checked == true) {
        if (count <= shop.initialCountBeer()) {
            if (itemsOfder[0].orderCount <= 0) {
                getId('text-area').innerHTML = getId('text-area').innerHTML + `<p>${itemsOfder[0].name}: <span id="beerV">${buyItems(0, +count)}</span> шт.</p>`;
            }
            else {
                getId('beerV').innerHTML = buyItems(0, +count)
            }
            shop.beerSell(count);
            shop.orderTotal();
            shop.balanceTotal()
            orderForm[0].value = ''
            console.log(itemsOfder)
        }
        if (count > shop.initialCountBeer()) {
            alert(`Вибачте але на складі залишилось ${orderForm[1].value}: ${shop.initialCountBeer()} шт.`)
            orderForm[0].value = ''
        }
    }
    if (orderForm[2].checked == true) {
        if (count <= shop.initialCountVine()) {
            if (itemsOfder[1].orderCount <= 0) {
                getId('text-area').innerHTML = getId('text-area').innerHTML + `<p>${itemsOfder[1].name}: <span id="vineV">${buyItems(1, +count)}</span> шт.</p>`;
            }
            else {
                getId('vineV').innerHTML = buyItems(1, +count)
            }
            shop.vineSell(count);
            shop.orderTotal();
            shop.balanceTotal()
            orderForm[0].value = ''
        }
        if (count > shop.initialCountVine()) {
            alert(`Вибачте але на складі залишилось ${orderForm[1].value}: ${shop.initialCountVine()} шт.`)
            orderForm[0].value = ''
        }
    }
    if (orderForm[3].checked == true) {
        if (count <= shop.initialCountPepsi()) {
            if (itemsOfder[2].orderCount <= 0) {
                getId('text-area').innerHTML = getId('text-area').innerHTML + `<p>${itemsOfder[2].name}: <span id="pepsiV">${buyItems(2, +count)}</span> шт.</p>`;
            }
            else {
                getId('pepsiV').innerHTML = buyItems(2, +count)
            }
            shop.pepsiSell(count);
            shop.orderTotal();
            shop.balanceTotal()
            orderForm[0].value = ''
        }
        if (count > shop.initialCountPepsi()) {
            alert(`Вибачте але на складі залишилось ${orderForm[3].value}: ${shop.initialCountVine()} шт.`)
            orderForm[0].value = ''
        }
    }
})


orderForm.buyBtn.addEventListener('click', function () {
    getId('order-list').innerHTML = getId('text-area').innerHTML + `<p>Всього: ${shop.orderTotal()} грн. </p>`;
    getId('text-area').innerHTML = ''
    orderForm[0].value = ''

    itemsForm[0].value = shop.initialBalance() + ' грн.';
    itemsForm[1].value = shop.initialCountBeer() + ' шт.';
    itemsForm[2].value = shop.initialCountVine() + ' шт.';
    itemsForm[3].value = shop.initialCountPepsi() + ' шт.'
    orderForm[1].checked == true
})

