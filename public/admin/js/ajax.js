
function update(id){
   
    let status = $('#data'+id).val()
    console.log(status);
   $.ajax({
    url:'/admin/order_update',
    method:'patch',
    data : {
      orderId : id,
      orderStatus : status,
    },
    success:(res)=>{
     if(res.success){
        $("#updte"+id).load(location.href + " #updte"+id);
     }
    }
   })
}

function remove(id){
   console.log(id);
   $.ajax({
      url:'/admin/delete',
      method:'delete',
      data:{
         bannerId : id
      },
      success:(res)=>{
         if(res.success){
           location.reload()
         }
      }
   })
}