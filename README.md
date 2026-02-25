1. Clone the Repository

git clone <your-repo-url>
cd <your-project-folder>

2. Create a .env.local file in the root of the project

touch .env.local

3. Add the following environment variables to .env.local:

MONGODB=mongodb://<your_mongodb_api>/aerosDatabase
GEMINI_API_KEY=<your_gemini_api>

> Replace <your_mongodb_api> and <your_gemini_api> with your actual MongoDB connection string and Gemini API key.

4. Start MongoDB and create the database aerosDatabase if it doesn’t exist.

5. Create the users collection in aerosDatabase with the following fields:

{
  "username": "your_username",
  "password": "your_password"
}

> Only username and password fields are required for this project.

6. Run the project

npm install
npm run dev

7. Test the app

Open the app in your browser: http://localhost:3000

Try logging in with a user from the users collection.

Change the password and verify it updates correctly in MongoDB.

⚙️ Notes

The username field is pre-filled from local storage and is read-only on the password change page.

Successful password change will redirect the user to the home page (or a dashboard page if configured).