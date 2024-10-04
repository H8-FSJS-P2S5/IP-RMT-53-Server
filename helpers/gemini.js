const { GoogleGenerativeAI } = require("@google/generative-ai");
// require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function gemini(monsterName) {
  console.log(monsterName, "<<< monsterName received");

  const prompt = `Provide a brief description of the monster named ${monsterName}.`;
  try {
    const result = await model.generateContent(prompt);
    const description = result.response.text();

    const plainTextDescription = description
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/`(.*?)`/g, "$1");
    // const shortDescription = plainTextDescription
    //   .split(". ")
    //   .slice(0, 10)
    //   .join(". ");

    return plainTextDescription;
  } catch (error) {
    console.error("Error calling Google AI:", error);
    throw error;
  }
}

module.exports = {
  gemini,
};
