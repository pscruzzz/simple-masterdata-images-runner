const api = require('./api.js')
const fs = require('fs')
const FormData = require('form-data')

const dotenv = require('dotenv');
dotenv.config();

async function Runner(){
  const field = 'imgFile'
  const id = process.env.DOCUMENT_ID

  const formDataConst = new FormData();
  formDataConst.append('file', fs.createReadStream('./Assets/cliqueretire.png'));
  
  try{

    const response = await api.post(
      `${id}/${field}/attachments/`,
      formDataConst
    ,
      {
        headers: formDataConst.getHeaders()
      }
    )

    const responseStatus = await response.status

    console.log(responseStatus)

    return responseStatus

  } catch(e){
    return e
  }
  
}

Runner()