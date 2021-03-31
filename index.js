const api = require('./api.js')
const fs = require('fs')
const FormData = require('form-data')

async function Runner(singleDocument){
  const field = 'imgFile'
  const id = singleDocument.id
  const documentAccount = singleDocument.account

  const formDataConst = new FormData();
  formDataConst.append('file', fs.createReadStream(`./assets/${documentAccount}.jpeg`));
  
  try{

    const response = await api.post(
      `documents/${id}/${field}/attachments/`,
      formDataConst
    ,
      {
        headers: formDataConst.getHeaders()
      }
    )

    const responseStatus = await response.status

    console.log(responseStatus, singleDocument.account)

    return responseStatus

  } catch(e){
    console.log(e)
    return e
  }
  
}

async function getAllDocuments(){
  try{

    const response = await api.get(`search`, {headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.vtex.ds.v10+json',
      'REST-Range': 'resources=0-200'
    }})

    const responseStatus = await response.status
    const responseData = await response.data
    const responseLength = await response.data.length

    console.log(responseData)

    return responseData

  } catch(e){
    console.log(e,'getAllDocuments falhou')
    return e
  }
}




async function Main(){
  const documentsArray = await getAllDocuments()

  await Promise.all(documentsArray.map(async eachDocument => {
    await Runner(eachDocument)
    return
  }))

  console.log('done')

  return 
}

Main()