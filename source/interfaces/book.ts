import { Document } from 'mongoose';

// describe our document that will be used inside mongodb and then will be attached to a model
// this is how mongo and mongoose are going to recognize that we have something called book
export default interface IBook extends Document {
    title: string;
    author: string;
    extraInformation: string; // show how to modify a document after it's been passed into mongoose usign some extra functions that are available to it
}
