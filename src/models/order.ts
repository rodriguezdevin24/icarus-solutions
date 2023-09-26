import mongoose, { Document, Schema } from 'mongoose';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

interface IProduct extends Document {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    sizes: Size[];
}

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true }]
});

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);

export default ProductModel;

