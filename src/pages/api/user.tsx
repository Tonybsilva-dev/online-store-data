import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string
}

const today = moment().format('D MMMM  YYYY, h:mm:ss a')

export default async (req: NextApiRequest, res: NextApiResponse<ErrorResponseType>) => {

  //CRIAR UM USUÁRIO
  if (req.method === 'POST') {
    const { name, email, description, phone, cpf, value, address, updated_at } = req.body;
    if (!name || !value){
      res.status(400).json({ error: 'Info missing' })
      return
    }
    const { db } = await connect();
    const response = await db.collection('users').insertOne({
      name,
      email,
      description,
      phone,
      cpf,
      value,
      address,
      created_at: today
    })
    console.log(response.ops[0])
    res.status(200).json(response.ops[0])
  }
  // else {
  //   res.status(400).json({ error: 'Wrong request method' })
  // }

  //BUSCAR UM USUÁRIO
  if (req.method === 'GET'){
    const { name, cpf } = req.body
    if (!name || !cpf){
      res.status(400).json({ error: 'Info missing' })
      return
    }
    const { db } = await connect();
    const response = await db.collection('users').findOne({ name: name })
    console.log(response)
    res.status(200).json(response)
  }

}
