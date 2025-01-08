import axios from "axios";
export const pushCardToDB = async (cardInfo) => {
    try {
        const requestBody = {
            setId: cardInfo.setId_, 
            term: cardInfo.term_,
            definition: cardInfo.definition_
        };
        const response = await axios.post('http://localhost:3000/api/v1/cards/add', requestBody); // Use POST with a body
        return response;
    } catch (error) {
        console.error("Error adding card", error);
    }
};