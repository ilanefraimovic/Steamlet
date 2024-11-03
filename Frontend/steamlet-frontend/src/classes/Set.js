import axios from "axios";
import Card from "../components/Card";
class Set {
    // Constructor
    constructor(setID, numberOfCards, setName, listOfCards = []) {
        this.numberOfCards = numberOfCards;
        this.setName = setName;
        this.listOfCards = listOfCards;
        this.setID = setID;
    }
    fetchCards = async () => {
        try {
            const requestBody = {
                // Include any data you need to send to the server
                setId: 123, // Example field
                // Add more fields as necessary
            };
            const response = await axios.post('/api/cards', requestBody); // Use POST with a body
            const fetchedCards = response.data.map(card => new Card(card.term, card.definition));
            this.listOfCards = fetchedCards;
        } catch (error) {
            console.error("Error fetching cards:", error);
        }
    };
    
    showSetHomepage() {
        
    }
}
