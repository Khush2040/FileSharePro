import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/fileshareDB").then(async () => {
    const users = await mongoose.connection.db.collection('users').find().toArray();
    const files = await mongoose.connection.db.collection('files').find().toArray();

    console.log("Users:", users.length);
    console.log("Users list:", users);
    console.log("Files:", files.length);
    console.log("Files list:", files);

    process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
