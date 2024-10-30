//https://fakestoreapi.com/products
let filterSection = document.querySelector(".main_container_filter_section_filterBox");
let productSection = document.querySelector(".main_container_production_section");
let productDetail = document.querySelector("#productDetail");
let productcart = document.querySelector("#productcart");
let productCheckOut = document.querySelector("#productCheckOut");
let productGuestCheckOutDetail = document.querySelector("#productGuestCheckOutDetail");
let paymentInfo = document.querySelector("#paymentInfo");
//paymentInfo
let productResultCount = document.querySelector(".main_container_production_result");
let allCategory = [];
let prodcutDetails_summary = document.querySelector(".main_prodcutDetails_summary");
let current_page = 1;
let records_per_page = 10;
let l = 0; 
let allProducts = [];
let x = 1;
function btnIncrement () {
    document.getElementById('output').innerText = ++x;
}
function btnDecrement () {
    if(x <=1){
        document.getElementById("output").disabled = ture;
    }else{
        document.getElementById('output').innerText = --x;
    }
}

let displayProduct = async (allCheckCategory=[])=>{
    productSection.innerHTML = '';
    let product = await fetch('https://fakestoreapi.com/products');
    let finalproduct = await product.json();
    let productsort = document.getElementById('sort-price').value;
    if(productsort==""){
        productsort = 'asc';
    }
    allProductsSort = [...finalproduct].sort((a, b) => productsort === 'asc' ? a.price - b.price : b.price - a.price);  

    allProductsSort.forEach(productItems =>{
        if(allCheckCategory.length==0){
            allCheckCategory=allCategory;
        }       
        if( ! allCategory.includes(productItems.category)){
           
            filterSection.innerHTML += `<div>
                <label for="${productItems.category}">
                    <input type="checkbox" onclick='categoryFilter()' value="${productItems.category}" name="${productItems.category}"> ${productItems.category}
                </label>
            <div>`;
            allCategory.push(productItems.category)
        }        
        if(allCheckCategory.includes(productItems.category)){  
            productSection.innerHTML += ` <div class="main_container_production_items">
                <div class="main_container_production_items_img">
                    <a href="javascript: productRedirect(${productItems.id});"><img src="${productItems.image}" alt=""></a>   
                </div>                        
                <h4>${productItems.title}</h4>
                <h5>Rs. ${productItems.price}</h5>
                <span><i class="fa fa-heart-o" aria-hidden="true"></i> Rate: ${productItems.rating.rate} / count : ${productItems.rating.count}</span>
            </div> `;                    
            allProducts.push(productItems)
        } 
        
    });  
    changePage(current_page);
}



let productRedirect = (productid) =>{
    localStorage.setItem("productid",productid);
    window.location = "product.html";
}
let cartRedirect = (productid) =>{
    localStorage.setItem("productid",productid);
    window.location = "cart.html";
}
let checkOutRedirect = (productid) =>{
    localStorage.setItem("productid",productid);
    window.location = "checkout.html";
}
let guestCheckOutDeatilsRedirect = (productid) =>{
    localStorage.setItem("productid",productid);
    window.location = "guestcheckoutdetail.html";
}
let paymentInfoRedirect = (productid) =>{
    localStorage.setItem("productid",productid);
    window.location = "paymentInfo.html";
}

let getProduct =  async () =>{
    productid = localStorage.getItem("productid");
    if(productid == "" || typeof productid == "undefined") window.location = "product.html";
    let products = await fetch('https://fakestoreapi.com/products');
    let finalproducts = await products.json();    
    finalproducts.forEach(productItems =>{
        if(productItems.id == productid){
            productDetails = productItems;
            productDetail.innerHTML = "";
            productDetail.innerHTML = `<div class="main_prodcutDetails_section">
                <div class="main_prodcutDetails_section_img">
                    <img src="${productItems.image}" alt="">
                </div>
                <div class="main_prodcutDetails_section_detail">
                    <h3>${productItems.title}</h3>
                    <h4>Rs. ${productItems.price}</h4>  
                    <div class="starsRate" style="--rating: ${productItems.rating.rate};" aria-label="Rating of this product is ${productItems.rating.rate} out of 5.">  
                    <p class="productRate">Rate: ${productItems.rating.rate} / count : ${productItems.rating.count}</p> 
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p> 
                    </div>
                    <h5>Quantity</h5>
                    <div class="main_prodcutDetails_section_detail_count">
                        <button type=button value="-" onclick="btnDecrement()">-</button>
                        <div id='output'>1</div>
                        <button type=button value="+" onclick="btnIncrement()">+</button>
                    </div>  
                    <button class="addToCartBTN" onclick="cartRedirect(${productItems.id});">ADD TO CART</button>     
                    <p>
                        <span><i class="fa fa-heart" aria-hidden="true"></i> Save </span> &nbsp;&nbsp;&nbsp;
                        <span> <i class="fa fa-share-alt" aria-hidden="true"></i> Share</span> 
                    </p>  

                    
                    <div class="pagination" id="pagination"></div>


                </div>
            </div>
            <div class="main_prodcutDetails_summary">
                <h4>${productItems.title}</h4>
                <h5>Description</h5>
                <p>${productItems.description}</p>
            </div>`
        } 
    });
}

let getProductcart =  async () =>{
    productid = localStorage.getItem("productid");
    if(productid == "" || typeof productid == "undefined") window.location = "index.html";
    let products = await fetch('https://fakestoreapi.com/products');
    let finalproducts = await products.json();
    finalproducts.forEach(productItems =>{
        if(productItems.id == productid){
            productcarts = productItems;
            productcart.innerHTML = "";
            productcart.innerHTML = `<div class="main_container_production_cart">  
                <div class="main_container_production_cart_img">
                    <img src="${productItems.image}" alt="">
                </div>
                <div class="main_container_production_cart_Details">
                    <h3>${productItems.title}</h3>
                    <h4>Rs. ${productItems.price}</h4>  
                </div>
                <div class="main_container_production_cart_count">
                    <div class="main_prodcutDetails_section_detail_count">
                        <button type=button value="-" onclick="btnDecrement()">-</button>
                        <div id='output'>1</div>
                        <button type=button value="+" onclick="btnIncrement()">+</button>
                    </div>  
                </div>
                <div class="main_container_production_cart_edit">
                    <p><i class="fa fa-pencil" aria-hidden="true"></i> Edit</p>
                    <p><i class="fa fa-trash" aria-hidden="true"></i> Remove</p>
                    <p><i class="fa fa-heart" aria-hidden="true"></i> Save</p>
                </div>
            </div>
            <div class="main_container_production_cart_amount">
                <h3>Pricing Summary</h3>
                <div>
                    <h6>Subtotal</h6>
                    <h6>Coupon</h6>
                    <h6>Estimated Tax</h6>
                    <h6>Estimated Shipping</h6>
                    <h6>Estimated Total</h6>
                </div>
                <div class="amountDiv">
                    <h6>Rs.  ${productItems.price}</h6>
                    <h6>Rs. -10</h6>
                    <h6>Rs. 18</h6>
                    <h6>Free</h6>
                    <h6>Rs.  ${productItems.price + 18 - 10}</h6>
                </div>
                <div class="checkOutBTN_div">
                    <button class="addToCartBTN checkOutBTN" onclick="checkOutRedirect(${productItems.id});">CHECK OUT</button>
                    <button class="paypalBTN"><i class="fa fa-paypal" aria-hidden="true"></i> PayPal</button>
                </div>
            </div>`
        } 
    });
}


let getCheckOut=  async () =>{
    productid = localStorage.getItem("productid");
    if(productid == "" || typeof productid == "undefined") window.location = "index.html";
    let products = await fetch('https://fakestoreapi.com/products');
    let finalproducts = await products.json();

    
    

    finalproducts.forEach(productItems =>{
        if(productItems.id == productid){
            productCheckOuts = productItems;
            productCheckOut.innerHTML = "";
            productCheckOut.innerHTML = `<div class="main_container_production_checkOut">  
                <h3 class="checkoutSubHeading">Check out</h3>
                <p class="checkoutSubparagraph">
                    <b>Contact information</b><br />
                    We'll use these details to keep you informed on your delivery
                </p>
                <form id="guestCheckOutForm">
                    <div class="main_container_production_checkout_form">
                        <label for="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="Email"><br/><br/>
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="phoneNumber">Phone Number</label>
                        <input type="text" id="phoneNumber" name="phoneNumber" placeholder="1234567890" required>  
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label><b>1. Shipping Information</b></label><br/><br/>
                    </div>
                    <div class="main_container_production_checkout_form">
                        &nbsp;
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="country">Country</label>
                        <select id="country" name="country" required>
                            <option value="india">India</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
                        </select>
                    </div>
                    <div class="main_container_production_checkout_form">
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" placeholder="First Name" required>
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" placeholder="Last Name" required>
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="streetAddress">Street Address</label>
                        <input type="text" id="streetAddress" name="streetAddress" placeholder="Street Address" required>
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="streetAddress2">Street Address 2</label>
                        <input type="text" id="streetAddress2" name="streetAddress2" placeholder="Street Address 2">
                    </div>
                    <div class="main_container_production_checkout_form">
                        <label for="city">City</label>
                        <input type="text" id="city" name="city" placeholder="City" required>
                    </div>
                    <div class="main_container_production_checkout_form">
                        <div class="guestCheckOutForm_state_ZIP">
                            <div class="guestCheckOutForm_div_state">
                                <label for="state">State</label>
                                <select id="state" name="state" required>
                                    <option value="andhraPradesh">Andhra Pradesh</option>
                                    <option value="arunachalPradesh">Arunachal Pradesh</option>
                                    <option value="assam">Assam</option>
                                </select>
                            </div>

                            <div class="guestCheckOutForm_div_ZIP">
                                <label for="zip">ZIP</label>
                                <input type="text" id="zip" name="zip" placeholder="111111" required>
                            </div>
                        </div>
                    </div>

                    <div class="checkOutBTN_div">
                        <button type="button" class="addToCartBTN checkOutBTN" onclick="validateAndSubmit(); ">CONTINUE TO SHIPPING METHOD</button>
                    </div>
                </form>
                
                    
            </div>
            <div class="main_container_production_cart_amount">
                <p class="signExpressCheckOut">
                    <span>Sign in for Express Checkout</span> <button type="button">SIGN IN</button>
                </p>
                <h3>Pricing Summary</h3>
                <div>
                    <h6>Subtotal</h6>
                    <h6>Coupon</h6>
                    <h6>Estimated Tax</h6>
                    <h6>Estimated Shipping</h6>
                    <h6>Estimated Total</h6>
                </div>
                <div class="amountDiv">
                    <h6>Rs.  ${productItems.price}</h6>
                    <h6>Rs. -10</h6>
                    <h6>Rs. 18</h6>
                    <h6>Free</h6>
                    <h6>Rs.  ${productItems.price + 18 - 10}</h6>
                </div>
            </div>`
        } 
        
    }); 
}

let getproductGuestCheckOutDetail=  async () =>{
    productid = localStorage.getItem("productid");
    if(productid == "" || typeof productid == "undefined") window.location = "index.html";
    cartitems = JSON.parse(localStorage.getItem("cartitems"));
    if(typeof cartitems == "undefined") window.location = "index.html";
    let products = await fetch('https://fakestoreapi.com/products');
    let finalproducts = await products.json();
    finalproducts.forEach(productItems =>{
        if(productItems.id == productid){
            productGuestCheckOutDetails = productItems;
            productGuestCheckOutDetail.innerHTML = "";
            productGuestCheckOutDetail.innerHTML = `<div class="main_container_production_checkOut"> 
                <h3 class="checkoutSubHeading">Guest Details</h3>
                <table class="guestShippingAddress">
                    <tbody>
                        <tr>
                            <td><h4>Shipping Information</h4></td>
                        </tr>
                        <tr>
                            <td><b>Email:</b></td>
                            <td>${cartitems.email}</td>
                        </tr>
                        <tr>
                            <td><b>Country:</b></td>
                            <td>${cartitems.country}</td>
                        </tr>
                        <tr>
                            <td><b>Name:</b></td>
                            <td>${cartitems.firstName} ${cartitems.lastName}</td>
                        </tr>
                        <tr>
                            <td><b>Street Address:</b></td>
                            <td>${cartitems.streetAddress}</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>${cartitems.streetAddress2}</td>
                        </tr>
                        <tr>
                            <td><b>City:</b></td>
                            <td>${cartitems.city}</td>
                        </tr>
                        <tr>
                            <td><b>State:</b></td>
                            <td>${cartitems.state}</td>
                        </tr>
                        <tr>
                            <td><b>ZIP:</b></td>
                            <td>${cartitems.zip}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number:</b></td>
                            <td>${cartitems.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="width:100%">
                    <h5>2. Shipping Method</h5>
                    <form class="shippingMethod">
                        <input type="radio" id="StandardShipping" name="shippingMethod" value="StandardShipping">
                        <label for="StandardShipping" name="shippingMethod"><b>Standard Shipping</b>(4-8 business days via USPS) FREE</label><br>
                        <input type="radio" id="expressDelivery" name="shippingMethod" value="expressDelivery">
                        <label for="expressDelivery" name="shippingMethod"><b>Express Delivery</b> (2-5 business days via USPS)</label><br>
                        <input type="radio" id="nextDayDelivery" name="shippingMethod" value="nextDayDelivery">
                        <label for="nextDayDelivery"  name="shippingMethod"><b>Next Day Delivery</b> (Next business days via USPS)</label><br>
                        <div id="outputDiv"></div>
                        <div class="continueToPaymentBTN">
                            <button type="button" class="addToCartBTN checkOutBTN" onclick="validateShippingMethod(); " >CONTINUE TO PAYMENT</button>
                        </div>                                           
                        
                    </form>
                </div>
            </div>
            <div class="main_container_production_cart_amount">
                <h3>Pricing Summary</h3>
                <div>
                    <h6>Subtotal</h6>
                    <h6>Coupon</h6>
                    <h6>Estimated Tax</h6>
                    <h6>Estimated Shipping</h6>
                    <h6>Estimated Total</h6>
                </div>
                <div class="amountDiv">
                    <h6>Rs.  ${productItems.price}</h6>
                    <h6>Rs. -10</h6>
                    <h6>Rs. 18</h6>
                    <h6>Free</h6>
                    <h6>Rs.  ${productItems.price + 18 - 10}</h6>
                </div>
            </div> `
        } 
        
    });
}

let getpaymentInfo=  async () =>{
    productid = localStorage.getItem("productid");
    if(productid == "" || typeof productid == "undefined") window.location = "index.html";
    cartitems = JSON.parse(localStorage.getItem("cartitems"));
    if(typeof cartitems == "undefined") window.location = "index.html";
    shippingMethodselect = localStorage.getItem("shippingMethodselect");
    let products = await fetch('https://fakestoreapi.com/products');
    let finalproducts = await products.json();
    finalproducts.forEach(productItems =>{
        if(productItems.id == productid){
            paymentInfos = productItems;
            paymentInfo.innerHTML = "";
            paymentInfo.innerHTML = `<div class="main_container_production_checkOut"> 
                <h3 class="checkoutSubHeading">Guest Details</h3>
                <table class="guestShippingAddress">
                    <tbody>
                        <tr>
                            <td><h4>Shipping Information</h4></td>
                        </tr>
                        <tr>
                            <td><b>Email:</b></td>
                            <td>${cartitems.email}</td>
                        </tr>
                        <tr>
                            <td><b>Country:</b></td>
                            <td>${cartitems.country}</td>
                        </tr>
                        <tr>
                            <td><b>Name:</b></td>
                            <td>${cartitems.firstName} ${cartitems.lastName}</td>
                        </tr>
                        <tr>
                            <td><b>Street Address:</b></td>
                            <td>${cartitems.streetAddress}</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>${cartitems.streetAddress2}</td>
                        </tr>
                        <tr>
                            <td><b>City:</b></td>
                            <td>${cartitems.city}</td>
                        </tr>
                        <tr>
                            <td><b>State:</b></td>
                            <td>${cartitems.state}</td>
                        </tr>
                        <tr>
                            <td><b>ZIP:</b></td>
                            <td>${cartitems.zip}</td>
                        </tr>
                        <tr>
                            <td><b>Phone Number:</b></td>
                            <td>${cartitems.phoneNumber}</td>
                        </tr>
                    </tbody>
                </table>
                <div style="width:100%" class="shippingMethodDiv">
                    <h5>Shipping Method</h5> 
                    <div>${shippingMethodselect}</div>
                </div>
            </div>
            <div class="main_container_production_cart_amount">
                <h3>Pricing Summary</h3>
                <div>
                    <h6>Subtotal</h6>
                    <h6>Coupon</h6>
                    <h6>Estimated Tax</h6>
                    <h6>Estimated Shipping</h6>
                    <h6>Estimated Total</h6>
                </div>
                <div class="amountDiv">
                    <h6>Rs.  ${productItems.price}</h6>
                    <h6>Rs. -10</h6>
                    <h6>Rs. 18</h6>
                    <h6>Free</h6>
                    <h6>Rs.  ${productItems.price + 18 - 10}</h6>
                </div>
            </div> `
        } 
        
    });
}

let categoryFilter = () => {
    let checkFilterInput = document.querySelectorAll("input[type = 'checkbox']");
    let checkboxData=[];
    checkFilterInput.forEach((e)=>{
        if(e.checked){
            checkboxData.push(e.value);
        }
    })
    displayProduct(checkboxData);
}

function mobilefilterFun() {
    let para = document.querySelector(".main_container_filter_section_filterBox");
    para.classList.toggle("show");
}
function mobilemenuFun() {
    let para = document.querySelector(".header_container_menu_nav");
    para.classList.toggle("show");
}

function validateAndSubmit() {
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const streetAddress = document.getElementById("streetAddress").value;
    const streetAddress2 = document.getElementById("streetAddress2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipPattern = /^[0-9]{6}$/;
    const phonePattern = /^[0-9]{10}$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return false;
    }
    if (firstName === "" || lastName === "" || streetAddress === "" || city === "") {
        alert("Please fill in all required fields.");
        return false;
    }
    if (!zipPattern.test(zip)) {
        alert("Please enter a valid 6-digit ZIP code.");
        return false;
    }
    if (!phonePattern.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }
    let cartitems = {};
    cartitems['email'] = email;
    cartitems['country'] = country;
    cartitems['firstName'] = firstName;
    cartitems['lastName'] = lastName;
    cartitems['streetAddress'] = streetAddress;
    cartitems['streetAddress2'] = streetAddress2;
    cartitems['city'] = city;
    cartitems['state'] = state;
    cartitems['zip'] = zip;
    cartitems['phoneNumber'] = phoneNumber;
    localStorage.setItem("cartitems","");
    localStorage.setItem("cartitems",JSON.stringify(cartitems));
    window.location = "guestcheckoutdetail.html";
}

function validateShippingMethod() { 
    const shippingMethods = document.getElementsByName('shippingMethod');
    let selectedMethod = '';
    for (const method of shippingMethods) {
        if (method.checked) {
            selectedMethod = method.nextElementSibling.innerText;
            break;
        }
    }
    const outputDiv = document.getElementById('outputDiv');
    if (selectedMethod) {
        let shippingMethodselect = { method: selectedMethod };
        shippingMethodselect = `<p>Selected Shipping Method:  <i>${selectedMethod}</i></p>`;
        localStorage.setItem("shippingMethodselect", "");
        localStorage.setItem("shippingMethodselect", shippingMethodselect);
        window.location = "paymentInfo.html";
    } else {
        outputDiv.innerHTML = `<p style="color:red;">Please select a shipping method.</p>`;
    }
}

if(productSection) displayProduct();
if(productDetail) getProduct();
if(productcart) getProductcart();
if(productCheckOut) getCheckOut();
if(productGuestCheckOutDetail) getproductGuestCheckOutDetail();
if(paymentInfo) getpaymentInfo();

function prevPage(){
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage(){
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}
    
function changePage(page){
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementsByClassName("main_container_production_items");
    var page_span = document.getElementById("page");     
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
    for (var i = 0; i < listing_table.length; i++) {
        listing_table[i].style.display = "none"
    }
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        if (listing_table[i]) {
            listing_table[i].style.display = ""
        } 
    }
    let showing = page + " of " + numPages() +" Pages";
    page_span.innerHTML = showing;
    productResultCount.innerHTML =  `${showing} `;
    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }
    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages(){
    let l = document.getElementsByClassName("main_container_production_items").length;
    return Math.ceil((l - 1) / records_per_page);
}






