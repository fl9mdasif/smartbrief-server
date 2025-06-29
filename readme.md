## SmartBrief AI - AI-Powered Content Summarization SaaS

SmartBrief AI is a full-stack MERN application that serves as a Software-as-a-Service (SaaS) platform for summarizing text content using the Google Gemini API. It features a complete authentication system, dynamic user roles with distinct permissions, a credit-based usage system, and an administrative panel for user management.

- Frontend Client: Deployed on Vercel

- Backend Server: Deployed on Render

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
