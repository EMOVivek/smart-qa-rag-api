# Smart Q&A RAG API

## 🚀 Setup

```bash
git clone <repo>
cd smart-qa-rag-api
npm install

## Create .env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/smartqa
OPENAI_API_KEY=your_key
JWT_SECRET=your_secret

## Seed Data for dummy data for initial dataset.
npm run seed

## Run Server
npm run dev

## APIs routes

GET /api/docs ## fetch all docs data

POST /api/auth/register ## Register user  payload { email, password }.

POST /api/auth/login ## Login user payload { email, password }
## Authorization: Bearer TOKEN
## payload {"question"}
POST /api/ask ##  Ask Question  

GET /api/ask/history ## History

## Point
## Currently using in-memory rate limiting for simplicity. 
## In production, Redis-backed rate limiting would be used.