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
           }

        }
    })
}