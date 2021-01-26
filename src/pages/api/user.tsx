import { NextApiRequest, NextApiResponse } from 'next';
import express, { Request } from 'express';
import moment from 'moment';
import connect from '../../utils/database';
import { Db } from 'mongodb';




interface ErrorResponseType {
  error: string
}

const today = moment().format('D MMMM  YYYY, h:mm:ss a')

export default async (req: NextApiRequest & Request, res: NextApiResponse<ErrorResponseType>) => {


  //CRIAR UM USUÁRIO
  if (req.method === 'POST') {

    //Define oque é necessário para criar
    const { name, email, description, phone, cpf, value, address } = req.body;

    //Condicional para prosseguir
    if (!name || !value) {
      res.status(400).json({ error: 'Info is missing!' })
      return
    }
    //Abre conexão com o banco (caso não esteja aberta)
    const { db } = await connect();
    //Insere os dados
    const response = await db.collection('users').insertOne({
      name,
      email,
      description,
      phone,
      cpf,
      value,
      address,
      created_at: today,
      updated_at: today
    })
    console.log(response.ops[0])
    res.status(200).json(response.ops[0])
  }
  // else {
  //   res.status(400).json({ error: 'Wrong request method' })
  // }

  //BUSCAR UM USUÁRIO
  if (req.method === 'GET') {
    //Necessário para buscar um usuáro
    const { name } = req.body

    //Condicional para prosseguir
    if (!name) {
      res.status(400).json({ error: 'Info is missing!' })
      return
    }
    //Abre conexão com o Banco de dados
    const { db } = await connect();
    //Realiza a pesquisa
    const response = await db.collection('users').findOne({ name: name })

    console.log(response)
    res.status(200).json(response)
  }

  if (req.method === "PUT") {

    const { name } = req.query
    const update = req.body
    if (!name) {
      res.status(400).json({ error: 'Name is missing!' })
      return;
    }

    //Conexão com o banco de dados
    const { db } = await connect();


    //VALIDAÇÃO SE EXISTE OU NÃO NO BANCO PARA PODER SER ALTERADO
    // const existsName = db.collection('users').find({"name": { $exists: true }})

    // if (!existsName){
    //   res.status(400).json({ error: 'Client not found!' })
    //   return;
    // }



    // Procura o usuário e os atualiza.
    const response = await db.collection('users').findOneAndUpdate({ "name": name }, { $set: update }, { returnOriginal: false })
      .then(updatedDocument => {
        if (updatedDocument) {
          console.log(`Document is updated!, ${updatedDocument.value as any} `)
          res.status(200).json(updatedDocument.value as any)
        } else {
          console.log(response)
          res.status(400).json({ error: 'This user could not be updated!' })
          return;
        }
      })

  }

}
