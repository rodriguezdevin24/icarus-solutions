import mongoose, { Document, Schema } from 'mongoose';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

interface IOrderItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    size: Size;
}

interface IOrder extends Document {
    userId: Schema.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: string;
}

const OrderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true, default: 'M' }
        },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, default: 'pending' }
});

const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
