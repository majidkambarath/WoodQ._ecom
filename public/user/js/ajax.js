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

function Addcoupon(total){
    let code = $('#code').val()
    console.log(code);
    console.log(total);
    
    $.ajax({
        url:'/apply_coupon',
        method:'post',
        data : {
            copuoncode : code,
            subTotal: total,
        },
        success:(res)=>{
            if(res.invalid){
                $('#invalid').html(res.invalid)
            }
            if(res.exprire){
                $('#invalid').html(res.exprire)
            }
            if(res.maximum){
                $('#invalid').html(res.maximum)
            }
            if(res.userEx){
                $('#invalid').html(res.userEx)
            }
            if(res.finnalDiscount){
                $('#total').html(res.finnalDiscount)
                $('#distPrice').val(res.finnalDiscount)
            }
            if(res.apply){
                $('#invalid').html(res.apply)
            }
            if(res.couponId){
                $('#couponId').val(res.couponId)
            }
        }
    })

}