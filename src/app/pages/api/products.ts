import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/database';
import ProductModel from '@/models/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect ();

    if (req.method === 'GET') {
        const products = await ProductModel.find({});
        res.status(200).json({ products})
    } else if (req.method === 'POST') {
        const newProduct = new ProductModel(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } else {
        res.status(405).end();
    }
}

    