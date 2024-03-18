function addOrder() {
    const dish = document.getElementById('dish').value;
    const price = document.getElementById('price').value;
    const table = document.getElementById('table').value;

    const order = {
        dish: dish,
        price: price,
        table: table
    };

    console.log(order);

    fetch('https://crudcrud.com/api/fddd4729d8044ef3b14e93fb86088609/orderDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Order added:', data);
        displayOrders();
    })
    .catch(error => console.error('Error:', error));
}

function deleteOrder(id) {
    fetch(`https://crudcrud.com/api/fddd4729d8044ef3b14e93fb86088609/orderDetails/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete order');
        }
        console.log('Order deleted successfully');
        displayOrders();
    })
    .catch(error => console.error('Error:', error));
}

function displayOrders() {
    fetch('https://crudcrud.com/api/fddd4729d8044ef3b14e93fb86088609/orderDetails')
    .then(response => response.json())
    .then(orders => {
        const ordersDiv = document.getElementById('orders');
        ordersDiv.innerHTML = '';

        orders.forEach(order => {
            ordersDiv.innerHTML += `
                <span>
                    ${order.dish} - $${order.price} - ${order.table}
                    
                </span>&nbsp&nbsp<span><button onclick="deleteOrder('${order._id}')">Delete</button></span>
            `;
        });
    })
    .catch(error => console.error('Error:', error));
}

// Initial display
displayOrders();
