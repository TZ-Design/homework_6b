
    var addCartButton = document.getElementById("addcart");
    let totalItem = 0;

    //when radio button selection change, display the new selection value
    function detectColorChange(event) {
        document.getElementById('colorSelected').innerHTML = event.target.value;
    }
    document.querySelectorAll("input[name='colorOptions']").forEach((input) => {
        input.addEventListener('change', detectColorChange);
    });

    //when radio button selection change, display the new selection value
    function detectFillChange(event) {
        document.getElementById('fillSelected').innerHTML = event.target.value;
    }
    document.querySelectorAll("input[name='fillOptions']").forEach((input) => {
        input.addEventListener('change', detectFillChange);
    });

    var Cart = [];
    //create array that will hold all ordered products
    
    var shoppingCart = (function() {
        cart = [];
        // Constructor
        function Item(name,quantity,color,fill,price) {
          this.name = name;
          this.quantity = quantity;
          this.fill = fill;
          this.color = color;
          this.price = price;
        }
        // Save cart
        function saveCart() {
          sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
        }
          // Load cart
        function loadCart() {
          cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
        }
        if (sessionStorage.getItem("shoppingCart") != null) {
          loadCart();
        }
        var obj = {};
  
        // Add to cart
        obj.addItemToCart = function(name,quantity,color,fill,price) {
            // for(var item in cart) {
            // if(cart[item].name === name) {
            //     cart[item].count ++;
            //     saveCart();
            //     return;
            // }
            // }
            var item = new Item(name,quantity,color,fill,price);
            cart.push(item);
            saveCart();
            //console.log('item:' + item.name + item.color + item.quantity + item.fill + item.price)
        }
        // Set count from item
        obj.setCountForItem = function(name, quantity) {
            for(var i in cart) {
            if (cart[i].name === name) {
                cart[i].quantity = quantity;
                break;
            }
            }
        };
        // Remove item from cart
        // obj.removeItemFromCart = function(name) {
        //     for(var item in cart) {
        //         if(cart[item].name === name) {
        //         cart[item].quantity --;
        //         if(cart[item].quantity === 0) {
        //             cart.splice(item, 1);
        //         }
        //         break;
        //         }
        //     }
        //     saveCart();
        // }

        // Count cart 
        obj.totalCount = function() {
            var totalCount = 0;
            for(var item in cart) {
            totalCount += cart[item].quantity;
            }
            return totalCount;
        }

        // Total cart
        obj.totalCart = function() {
            var totalCart = 0;
            for(var item in cart) {
            totalCart += cart[item].price * cart[item].quantity;
            }
            return Number(totalCart);
        }

        // List cart
        obj.listCart = function() {
            var cartCopy = [];
            for(i in cart) {
            item = cart[i];
            itemCopy = {};
            for(p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = Number(item.price * item.count);
            cartCopy.push(itemCopy)
            }
            return cartCopy;
        }
        return obj;
        })();
    
    //this function manipulates DOM and displays content of our shopping cart
    function displayShoppingCart(){
        var cartArray = shoppingCart.listCart();
        //console.log(cartArray);
        var output = "";
        for(var i in cartArray) {
            output += "<tr>"
              + "<td>" + cartArray[i].name + "</td>" 
              + "<td>(" + cartArray[i].price + ")</td>"
              + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
              + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
              + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
              + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
              + " = " 
              + "<td>" + cartArray[i].total + "</td>" 
              +  "</tr>";
          }
        //var orderedProducts=document.getElementById("orderedProducts");
        //ensure we delete all previously added rows from ordered products table
        // while(orderedProducts.rows.length>0) {
        //     orderedProducts.deleteRow(0);
        // }
        //console.log(output);
        //var display = cartArray
        //document.getElementById('showCartTable').innerHTML = output;
        //$('.total-cart').html(shoppingCart.totalCart());
        //$('.total-count').html(shoppingCart.totalCount());

        //variable to hold total price of shopping cart
        var cart_total_price=0;
        for(var i in cartArray) {
            cart_total_price += cartArray[i].price;
        }
    }

        // //iterate over array of objects
        // for(var product in shoppingCart){
        //     //add new row      
        //     var row=orderedProducts.insertRow();
        //     //create three cells for product properties 
        //     var cellName = row.insertCell(0);
        //     var cellDescription = row.insertCell(1);
        //     var cellPrice = row.insertCell(2);
        //     cellPrice.align="right";
        //     //fill cells with values from current product object of our array
        //     cellName.innerHTML = shoppingCart[product].Name;
        //     cellDescription.innerHTML = shoppingCart[product].Description;
        //     cellPrice.innerHTML = shoppingCart[product].Price;
        //cart_total_price+=shoppingCart[product].Price;
    //}
        //fill total cost of our shopping cart 
    //     document.getElementById("totalPrice").innerHTML=cart_total_price;
    // }

  
    function AddtoCart(name,quantity,color,fill,price){
       var singleProduct = {};
       singleProduct.Name=name;
       singleProduct.Quantity=quantity;
       singleProduct.Price=price;
       singleProduct.Color=color;
       singleProduct.Fill=fill;
       Cart.push(singleProduct);
       displayShoppingCart();
    }  

    
    // temporarilly change the button text to "added!"
    document.getElementById('addcart').addEventListener('click', function (clicked) {
        return function () {
            if (!clicked) {
                var last = this.innerHTML;
                this.innerHTML = 'Added!';
                clicked = true;
                setTimeout(function () {
                    this.innerHTML = last;
                    clicked = false;
                }.bind(this), 1000);
            }
        };
    }(false), this);

    // when button is clicked, grab properities of the item and add to cart
    addCartButton.onclick = function(){
    console.log("button pressed")
        //store product name
        var name = document.getElementById("itemname").textContent; 
        localStorage.setItem('itemName',name)

        //store product quantity
        var quantity = Number(document.getElementById("quantity").value);
        totalItem = Number(totalItem + quantity); //update total quantity
        localStorage.setItem("itemQuantity",quantity)
        localStorage.setItem("cartTotalItems",totalItem)

        console.log('quantity: ' + quantity)
        console.log('total item: ' + totalItem)

        var color = document.querySelector('input[name="colorOptions"]:checked').value;
        document.getElementById('colorSelected').innerHTML = color;
        localStorage.setItem('itemColor',color)
        //console.log(color)
        var fill = document.querySelector('input[name="fillOptions"]:checked').value;
        document.getElementById('fillSelected').innerHTML = fill;
        localStorage.setItem('itemFill',fill)
        //console.log(fill)
        var p = document.getElementById("itemprice").textContent;
        var price = p.match(/\d/g);
        price = price.join("");
        localStorage.setItem('itemPrice',price)
        //console.log(price);
        
        document.getElementById("navCart").innerHTML ='Cart (' + localStorage.getItem("cartTotalItems") + ')';

        shoppingCart.addItemToCart(name, quantity, color, fill, price);
        AddtoCart(name, quantity, color, fill, price);
        

        var addedItem = {
            name: name,
            quantity: quantity,
            color: color,
            fill: fill,
            price: price
        };
        localStorage.setItem('added-item', JSON.stringify(addedItem))
    }

    function updateCartItemCount(){
        if (localStorage.getItem("cartTotalItems") !== null){
            document.getElementById("navCart").innerHTML ='Cart (' + localStorage.getItem("cartTotalItems") + ')';
            console.log('cart total updated');
        }
    }
    
    function updatedCartPage(){
        document.getElementById("navCart").innerHTML ='Cart (' + localStorage.getItem("cartTotalItems") + ')';
        var newItem  = JSON.parse(localStorage.getItem("added-item"));
        console.log(newItem)
        var table = document.getElementById("showCartTable");
        //console.log('table row count' + table.rows.length)
        //insert a new row
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = newItem.name;
        cell2.innerHTML = newItem.color;
        cell3.innerHTML = newItem.fill;
        cell4.innerHTML = '<td><input type="number" class="itemQ" name="quantity" value="' + newItem.quantity + '" + min="1" max="10"></td>';
        //cell4.setAttribute("value", newItem.quantity);
        cell5.innerHTML = '$' + newItem.price;
        cell6.innerHTML = "&#x2715";
        cell6.className = "remove";
        cell6.setAttribute("onclick","removeRow(this)")

        document.getElementById("totalPrice").innerHTML = '$' + newItem.price * newItem.quantity;
        document.getElementById("totalItems").innerHTML = localStorage.getItem("cartTotalItems");
        //clearLocalStorage();
    }

    function clearLocalStorage(){
        localStorage.removeItem("added-item")
        localStorage.removeItem("itemName")
        localStorage.removeItem("itemQuantity")
        localStorage.removeItem('itemColor')
        localStorage.removeItem('itemFill')
        localStorage.removeItem('itemPrice')
    }

    function removeRow(elem){
        //console.log('elem' + elem)
        //document.getElementById("showCartTable").deleteRow(1);
        var tr = elem.parentNode; // the row to be removed
        //console.log('tr' + tr)
        tr.parentNode.removeChild(tr);
        localStorage.setItem("cartTotalItems", localStorage.getItem("cartTotalItems")-localStorage.getItem("itemQuantity"));
        updateCartTotal();
        updateCartItemCount();
    }

function updateCartTotal(){
    document.getElementById("totalPrice").innerHTML = '$0';
    document.getElementById("totalItems").innerHTML = localStorage.getItem("cartTotalItems");
    console.log("update cart summary")
}