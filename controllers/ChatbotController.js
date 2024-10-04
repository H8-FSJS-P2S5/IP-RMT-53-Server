const geminiRecommendation = require("../helpers/gemini");

class ChatbotController {
    static async getAnimeRecommendation(req, res, next) {  
        const { prompt } = req.body;  
    
        try {  
          // Fetch the recommendation using the gemini function  
          const recommendation = await geminiRecommendation(prompt);  
    
          // Send back a success response  
          res.status(200).json({  
            message: "Gemini AI Chatbot replied successfully",  
            recommendation,  
          });  
        } catch (error) {  
          console.error("Error in getAnimeRecommendation:", error); // Log the error for debugging  
          next(error); 
        }  
      }  
}

module.exports = ChatbotController;
