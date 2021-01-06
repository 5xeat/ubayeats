import magicrails from '@rails/ujs'

document.addEventListener('turbolinks:load',()=>{
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', setRemoveItemBtn)
        })
    document.querySelectorAll('.cart .quantity').forEach(input =>{
            input.addEventListener('change', setQuantity)
        })
})

function setQuantity(e){
    console.log('hi')
}

function setRemoveItemBtn(e){
    const row =  e.currentTarget.parentElement.parentElement.parentElement
    console.log(row)
    const product_id = row.getAttribute('id')
    // '/carts/remove_item/' + product_id.to_s 
    magicrails.ajax({
        url: `/carts/remove_item/${product_id}`,
        type: 'delete',
        success: (resp) => {
            console.log(resp)
        },
        error: (err) => {
            console.log(err)
        }
    })

    // row.remove()

    // updateCart()
}

function updateCart(){
    const cartItems = document.querySelectorAll('.cart .cart-item')

    let total = 0
    cartItems.forEach(item => {
        const quantity = item.querySelector('.quantity').value
        const price = item.querySelector('.price').innerText
        total += (quantity * price)
    })

    document.querySelector('.total-price').innerText = total
}