import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/database';
import OrderModel from '@/models/order';

export default async function handler (req:NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    

    if (req.method === 'GET') {
        const orders = await OrderModel.find({});
        res.status(200).json(orders)
    } else if (req.method === 'POST') {
        const newOrder = new OrderModel(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } else {
        res.status(405).end()
    }

}
