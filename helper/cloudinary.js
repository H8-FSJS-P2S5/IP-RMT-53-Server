require("dotenv").config()
const { v2 : cloudinary } = require('cloudinary');

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    module.exports = async (file, model, data, folder) => {
        const base64Tesk = file.buffer.toString("base64");
        const mimeType = file.mimeType;
        let base64image = `data:${mimeType};base64,${base64Tesk}`

        const uploadeResault = await cloudinary.uploader.upload(base64image, {
            public_id: `${model}_${data.id}`,
            folder
        })
        return uploadeResault;
    }