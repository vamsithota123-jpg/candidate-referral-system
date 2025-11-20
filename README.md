"# candidate-referral-system" 

project live

https://musical-paletas-d64c53.netlify.app/



Setup Instructions
🔧 1. Backend Setup (Render Ready)
Install dependencies
cd backend
npm install

Create .env
MONGO_URI=mongodb://localhost:27017/candidate_referrals
PORT=5000

Start the backend
npm run dev

Install dependencies
cd frontend
npm install


Create .env
VITE_API_URL=http://localhost:5000/api


Start dev server
npm run dev



Deployment Guide
🚀 Deploy Backend to Render
1. Push your repo to GitHub
2. Go to https://render.com
3. Create new → Web Service
4. Select your repo
5. Choose root directory: /backend
6. Set environment variables:

MONGO_URI=your_atlas_uri
PORT=5000
