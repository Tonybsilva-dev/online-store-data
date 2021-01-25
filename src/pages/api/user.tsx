import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
  error: string
}

export default async (req: NextApiRequest, res: NextApiResponse<ErrorResponseType>) => {


  if (req.method === 'POST') {
    const { name, email, description, phone, cpf, value, address } = req.body;

    if (!name || !value){
      res.status(400).json({ error: 'Info missing' })
    }

    const { db } = await connect();
    const response = await db.collection('users').insertOne({
      name,
      email,
      description,
      phone,
      cpf,
      value,
      address
    })
    console.log(response.ops[0])

    res.status(200).json(response.ops[0])
  }

  else {
    res.status(400).json({ error: 'Wrong request method' })
  }
}
