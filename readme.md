## SmartBrief AI - AI-Powered Content Summarization SaaS

SmartBrief AI is a full-stack MERN application that serves as a Software-as-a-Service (SaaS) platform for summarizing text content using the Google Gemini API. It features a complete authentication system, dynamic user roles with distinct permissions, a credit-based usage system, and an administrative panel for user management.

- Frontend [ClientLIVE WEBSITE](https://master.d3mia3lbsm9fsq.amplifyapp.com/)

### Core Features

- Secure JWT Authentication: Robust user registration and login system with access and refresh tokens.

- Dynamic User Roles & Permissions:

- Admin: Full access to user management and all summaries. Can recharge credits and change user roles.

- Editor: Can view, re-prompt, and delete any summary.

- Reviewer: Can view all summaries but cannot perform any edit or delete actions.

- User: Can only create, view, re-prompt, and delete their own summaries.

- Credit-Based System: New users start with 5 credits, with each summarization and re-prompt request costing 1 credit.

- Interactive UI: A sidebar-based layout for intuitive navigation between creating new summaries and viewing historical ones.

- Performance Caching: Utilizes Redis on the backend to cache summary results, reducing API costs and improving response times for duplicate requests.

- Full Admin Panel: A dedicated dashboard for administrators to view all users, manage their roles, and recharge their credit balances.

## Technology Stack

The backend is constructed with the following technologies:

- Runtime Environment: Node.js

- Web Framework: Express.js

- Primary Language: TypeScript

- Database: MongoDB with Mongoose as the Object Data Modeler (ODM)

- Authentication: jsonwebtoken

- Password Hashing: bcrypt

- Caching Layer: Redis, managed via the ioredis client

- Artificial Intelligence API: Google Gemini (@google/generative-ai)

- Server Deployment Platform: Vercel

## Local Setup and Installation Instructions

To set up the project for local development, please follow these steps:

```
git clone [your-repo-url]
cd SmartBrief-server
```

- Install Dependencies:

```npm
npm install
```

Configure Environment: Create and populate the .env file as specified in the section above.

- Launch the Development Server:

```npm
npm run dev

```

Upon successful execution, the server will be accessible at `http://localhost:5000`

## API Endpoint Reference

The following is a summary of the primary API routes available in this application:

- `POST /api/v1/auth/register:` Registers a new user account.

- `POST /api/v1/auth/login:` Authenticates a user and returns JWT access and refresh tokens.

- `POST /api/v1/summaries:` Creates a new summary; requires authentication and consumes one credit.

- `GET /api/v1/summaries:` Retrieves a list of summaries.

- `DELETE /api/v1/summaries/:id:` Deletes a specified summary.

- `PATCH /api/v1/summaries/:id/re-prompt:` Re-generates a summary from an existing prompt; consumes one credit.

- `GET /api/v1/admin/users:` Retrieves a list of all users. This endpoint is restricted to users with the 'admin' role.

- `PATCH /api/v1/admin/users/recharge-credits:` Adds a specified number of credits to a user's account. This endpoint is restricted to users with the 'admin' role.

- `PATCH /api/v1/admin/users/change-role:` Modifies the role of a specified user. This endpoint is restricted to users with the 'admin' role.
