# centivo-challenge
My approach uses the Express.js framework to build the API server and Mongoose library to connect to MongoDB and retrieve the user data.  
The core logic handles the request by first validating the incoming user ID format.   
It then performs a single database query that checks for both the matching _id and that the user's age is greater than 21, ensuring all conditions are met before returning a result.
