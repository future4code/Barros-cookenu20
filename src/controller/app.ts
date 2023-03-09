import express from 'express'
import cors from 'cors'
import { AddressInfo } from 'net'

export const app = express()

app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3306 , () => {
   if (server){
       const address = server.address() as AddressInfo;
       console.log("Servidor rodando na porta 3306")
   } else {
       console.log("Failure upon starting server")
   }
});

// app.listen(3306, () => {
//    console.log('Servidor rodando na porta 3306')
// })