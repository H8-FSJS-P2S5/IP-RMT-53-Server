const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiRecommendation = async (userMessage) => {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    // Create a prompt that specifically asks for recommendations
    const prompt = `
      User is asking for anime recommendations. 
      User input: "${userMessage}"
      Please provide a detailed anime recommendation based on the user’s request. 
      and then give an anime title based on user request
    `;

    const result = await model.generateContentStream(prompt);
    const response = await result.response;

    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates found in the response");
    }

    const content = response.candidates[0].content;


    if (content && Array.isArray(content.parts)) {
      return content.parts.map((part) => part.text).join(" "); // Ensure you're accessing the correct property for text
    } else {
      throw new Error("Content structure is not as expected");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error(
      "Failed to generate recommendation. Please try again later."
    );
  }
};

module.exports = geminiRecommendation;
