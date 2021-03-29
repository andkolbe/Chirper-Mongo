import * as mongoose from 'mongoose';

// The Schema defines the structure of the documents that we are later going to store inside a collection
// a model wraps around a schema and provides us an interface by which we can communicate with a database collection for that document type

const UserSchema = new mongoose.Schema({
    // all of these fields come back from google
    googleId: {
        type: String,
        required: true,
      },
      displayName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      image: {
        type: String,
      },
}, { timestamps: true }); // createdAt

// create the model and export it 

// the first argument is the name of the model
// mongoose will look at this name, pluralize it, and look for that collection inside the database whenever we use this model in the future to communicate with the database

// the second argument is the schema we want to base this model on
export default mongoose.model('User', UserSchema);