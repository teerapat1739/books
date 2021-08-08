// const { add_queue, EVENTS } = require('./queue')

const create_response = (res, data, status_code = 200, response_headers = {}) => {
  data = {
    success :  status_code == 200  ? 1 : 0,
    data : data
  }
  const response = {
    status_code,
    data: data,
    response_headers
  }
  res.locals._response = response

  return res.locals._next()
}
function genarate_alert(title,message,type,link){
  return  `
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js"></script>
  <script type="text/javascript">
  $(document).ready(function () {
     swal('${title}', '${message}', '${type}').then(function (result) {
       window.location.href= '${link}'
     });
    
  })
 </script>
  `
   
}
const redirect_alert = (res,title,message,type,link ='') => {
    return res.send(genarate_alert(title,message,type,link))
}
module.exports = { create_response,redirect_alert }