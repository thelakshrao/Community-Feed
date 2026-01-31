Community Feed & Karma Leaderboard
A real-time social platform where users can post, reply, and earn Karma points. Built as a technical challenge to demonstrate full-stack integration between Django REST Framework and React.
Quick Start
1. Prerequisites
Python 3.x

Node.js (v18+)

npm or yarn

2. Backend Setup (Django)
Bash
cd backend
# Create virtual environment
python -m venv venv

# Install dependencies
pip install django djangorestframework django-cors-headers

# Database setup
python manage.py migrate
python manage.py createsuperuser # Create an 'admin' user for the karma logic

# Start server
python manage.py runserver 8001
3. Frontend Setup (React/Vite)
Bash
cd frontend
# Install dependencies
npm install

# Start development server
npm run dev
Note: The frontend is configured to run on http://localhost:3000 and communicate with the backend on port 8001.
 Features
Community Feed: Create posts and see real-time updates.

Threaded Comments: Infinite nesting capability for organized discussions.

Karma System: * +5 Points: For every 'Like' received on a post.

+1 Point: For every comment made (engagement reward).

Real-time Leaderboard: Automatically recalculates and ranks users based on activity within the last 24 hours.

Project Structure
/backend: Django project containing the API logic, models, and karma serializers.

/frontend: Vite + React application using Tailwind CSS for a modern UI.

Tech Stack
Frontend: React, Vite, Tailwind CSS, Axios.

Backend: Python, Django, Django REST Framework.

Database: SQLite (default for development).
