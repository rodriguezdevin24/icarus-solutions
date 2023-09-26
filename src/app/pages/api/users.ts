import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/database';
import UserModel from '@/models/user';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if(req.method === 'GET') {
        const Users = await UserModel.find({});
        res.status(200).json(Users);
        
    } else if (req.method ==='POST') {
        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } else {
        res.status(405).end();
    }
}