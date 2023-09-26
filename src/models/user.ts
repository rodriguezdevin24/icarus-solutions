import mongoose, { Schema, Document } from 'mongoose';

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

interface ICartItem {
    productId: Schema.Types.ObjectId;
    quantity: number;
    size: Size;
}

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    cart: ICartItem[];
    favorites: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true, default: 1 },
            size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'], required: true, default: 'M' }
        },
    ],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
