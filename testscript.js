//https://fakestoreapi.com/products
let filterSection = document.querySelector(".main_container_filter_section_filterBox");
let productSection = document.querySelector(".main_container_production_section");
let productResultCount = document.querySelector(".main_container_production_result");
let allCategory = [];


let displayProduct = async (allCheckCategory=[])=>{
    productSection.innerHTML = '';
    let product = await fetch('https://fakestoreapi.com/products');
    let finalproduct = await product.json();
    //console.log(finalproduct);
    
    let allProducts = [];
    finalproduct.forEach(productItems =>{
        if(allCheckCategory.length==0){
            allCheckCategory=allCategory;
        } 
        if( ! allCategory.includes(productItems.category)){
           
            filterSection.innerHTML += `<label for="">
                            <input type="checkbox" onclick='categoryFilter()' value="${productItems.category}"> ${productItems.category}
                        </label> `;
                        allCategory.push(productItems.category)
        }
        
               
        if(allCheckCategory.includes(productItems.category)){        

                 productSection.innerHTML += ` <div class="main_container_production_items">
                        <div class="main_container_production_items_img">
                            <img src="${productItems.image}" alt="">   
                        </div>                        
                        <h4>${productItems.title}</h4>
                        <h5>Rs. ${productItems.price}</h5>
                        <span><i class="fa fa-heart-o" aria-hidden="true"></i> Rate: ${productItems.rating.rate} / count : ${productItems.rating.count}</span>
                    </div> `;
                    
                    allProducts.push(productItems)

                }
             
          
    });
    
    productResultCount.innerHTML =  `${allProducts.length}&nbsp;Result`
}

displayProduct();

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

