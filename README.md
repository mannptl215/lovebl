

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Express.js (Backend API)
- Axios (API client)

## API Integration

This project includes a full API integration for services:

### API Structure

#### Endpoints

- `GET /api/services` - Get all available services
- `GET /api/services/:id` - Get details for a specific service
- `POST /api/services/:id/process` - Process a service request
- `GET /api/services/:id/history` - Get usage history for a service
- `GET /api/services/:id/pricing` - Get pricing information for a service

#### Service-specific endpoints

- `POST /api/image/enhance` - Enhance image quality
- `POST /api/image/text-to-image` - Generate image from text
- `POST /api/image/animation` - Convert image to animation
- `POST /api/audio/enhance` - Enhance audio quality
- `POST /api/utility/prompt` - Generate AI prompts

### Running the Application with API

1. Install backend dependencies:
   ```
   cd server
   npm install
   ```

2. Start both frontend and backend:
   ```
   npm run start
   ```

3. Or start backend only:
   ```
   npm run server
   ```
