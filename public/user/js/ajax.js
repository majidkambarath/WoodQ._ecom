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
                let count = $('#qty').html()
                count = parseInt(count)+1
                $('#qty').html(count)                 
               location.reload();
            }
        }
       
    })
    console.log('dgbdjgbdlj');
}