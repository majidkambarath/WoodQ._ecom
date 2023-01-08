// const { response } = require("express")

function addToCart(id){
    $.ajax({
        url:'/addToCart',
        method:'post',
        data : {
            proId : id
        },
        success:(response)=>{
            
           if(response.success){
           let count =$('#count-id').html()
           count = parseInt(count)+1
           $('#count-id').html(count)
           location.reload();
           }
          
        }
    })
}



function change(prodId,cartId,count){

    
    $.ajax({
        url:'/change-quantity',
        method:'post',
        data:{
            prodt:prodId,
            cart:cartId,
            change:count
        },
        success:(response)=>{
            if(response.success){
                // let count = $('#qty').html()
                // count = parseInt(count)+1
                // $('#qty').val(count)                 
               location.reload();
            }
        }
       
    })
    console.log('dgbdjgbdlj');
}


function addTowish(id){
    console.log(id);
    $.ajax({
        url:'/addTowishlist',
        method:'post',
        data : {
            prodId : id
        },
       
        success:(response)=>{
            if(response.wish){
                Swal.fire({
                    title: "Product Already in Wishlist..!",
                    icon: "warning",
                    confirmButtonText: "continue",
                  }).then(function () {
                    location.reload();
                  });
                
                }else{
                    location.reload()
                }
          
        }
    })
    console.log(data);

}