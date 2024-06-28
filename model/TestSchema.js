import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        match: /^#[0-9A-F]{6}$/i 
    }
});

 const Test = mongoose.model('Test', TestSchema);
 export default Test
