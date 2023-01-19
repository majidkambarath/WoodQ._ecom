 const order = require('../../models/order');
 const exceljs = require('exceljs');

 exports.exportorder =  async(req,res)=>{
    try{
        const workbook = new exceljs.Workbook();
        const  worksheet = workbook.addWorksheet("Sales Roport")
        worksheet.columns=[
          {header:"s no.", key:"s_no",width:20},
          {header:"Date", key:"data",width:20},
          {header:"User", key:"user",width:20},
          {header:"Payment", key:"payment",width:20},
          {header:"Status", key:"status",width:20},
          {header:"total", key:"total",width:20},
          
        ];
        let counter =1;
        
        const saledata = await order.find({orderStatus : "Devliverd"});
        console.log(saledata);
        saledata.forEach((sale)=>{
          const date = sale.orderDate;
          const isoString = date.toISOString();
          const newDate = isoString.split('T')[0];
          sale.data = newDate
          sale.s_no = counter;
          sale.user=sale.name;
          sale.payment=sale.paymentMethod;
          sale.status=sale.orderStatus;
          sale.total=sale.totalPrice;
         
         worksheet.addRow(sale);
        counter++;
        });
        
        
        worksheet.getRow(1).eachCell((cell)=>{
          cell.font={bold:true};
        });
        
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheatml.sheet'
        );
        
        res.setHeader('Content-Disposition',`attachment; filename=sales_Report.xlsx`);
        
        return workbook.xlsx.write(res).then(()=>{
          res.status(200);
        });
        
          }
          catch(error){
        console.log(error.message)
          }
        
        }
        
 