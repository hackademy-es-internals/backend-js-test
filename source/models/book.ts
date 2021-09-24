import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/book';

// constant BookSchema of type Schema
const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        extraInformation: { type: String }
    },
    {
        timestamps: true // created_at and updated_at
    }
);
// this means that whene you're creating a new book document it has to have title and author because are required

// exportin this model in order to use it in our api
// we pass <IBook> because everytime we use a mongoose function like find, updateById, deleteOne whatever is being returned in then block it's going to know to use IBook interface, therefore we're going to have access to all of our variables
export default mongoose.model<IBook>('Book', BookSchema);
