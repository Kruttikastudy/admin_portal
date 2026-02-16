---
description: How to deploy the backend to Render
---

# Deploying the Node.js Backend to Render

Follow these exact steps to deploy your backend folder as a standalone Web Service on Render.

## 1. Prepare your Repository
Ensure your latest changes (including the `backend` folder) are pushed to your GitHub or GitLab repository.

## 2. Create a New Web Service on Render
1. Log in to [Render](https://dashboard.render.com).
2. Click the **"New +"** button and select **"Web Service"**.
3. Connect your repository where the project is located.

## 3. Configure the Service
In the creation form, set the following values:

- **Name**: `sspd-backend` (or your preferred name)
- **Region**: Select the one closest to you.
- **Branch**: `main` (or your active branch)
- **Root Directory**: `backend` (This is critical since your backend is in a subfolder)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

## 4. Set Environment Variables
Click on the **"Advanced"** button or go to the **"Env Vars"** tab after creation:

| Key | Value |
| :--- | :--- |
| `MONGO_URI` | *Your MongoDB connection string* |
| `PORT` | `10000` (Render allocates this automatically, but setting it doesn't hurt) |
| `NODE_ENV` | `production` |

## 5. Deploy
1. Click **"Create Web Service"**.
2. Wait for the build and deployment to finish. Once done, you will see a URL (e.g., `https://sspd-backend.onrender.com`).

## 6. Update Frontend
Once you have the backend URL, ensure your frontend (which is already deployed) points to this new URL instead of `localhost:5002`.
