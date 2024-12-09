require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = async (art1, art2) => {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `please give me specification, pros and cons of ${art1} vs ${art2} Response must be a format JSON like this
    {
        "art1": {
            "name": ....,
                "specification": {
                "artist": ....,
                "date": ....,
                "location": ....
            },
            "pros": [
            ....
            ],
            "cons": [
            ....
            ]
        }
    },
        "art2": {
            "name": ....,
                "specification": {
                "artist": ....,
                "date": ....,
                "location": ....
            },
            "pros": [
            ....
            ],
            "cons": [
            ....
            ]
        }
    . create without \`\`\`json and \`\`\``;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text()

    console.log(text);
    text = JSON.parse(text.trim())

    return text
}

module.exports = gemini;
