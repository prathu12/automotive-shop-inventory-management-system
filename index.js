const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String
}, {
    timestamps: true
})

const userModel = mongoose.model("user", schemaData)


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/shop')
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));


mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.get('/', async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})

//Read data
app.post('/create', async (req, res) => {
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "Data saved successfully", data: data })
})

//Update data
app.put("/update", async (req, res) => {
    console.log(req.body); 
    const { id, ...rest } = req.body
    console.log(rest);

    const data = await userModel.updateOne({ _id: id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})

//Delete data
app.delete("/delete/:id", async (req,res)=>{
     const id = req.params.id
    console.log(id);
    const data = await userModel.deleteOne({_id : id})
    res.send({success:true, message: "data deleted successfully", data : data})
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
