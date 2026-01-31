When I first started this challenge, I wanted the app to feel like a living system where everything talks to each other. Here is how I broke it down:

The Big Picture:-
I kept the frontend and backend separate, using Django REST Framework for the "brains" and React for the "face." This separation means I can overhaul the UI without ever touching the database logic.

The Karma System:-
Instead of a static number, I made the backend calculate Karma on the fly. I weighted Post Likes at 5 points and Comments at 1 point, adding a 24-hour "Time-Box" rule to keep the leaderboard fresh and competitive.

Comment Threads:
To handle nested replies, I used Recursive Rendering in React. The Comment component is smart enough to call itself if a reply exists, creating a clean, indented thread structure without needing extra libraries.

Keeping the UI Fresh:-
To make the app feel fast, I used a "Fetch-on-Action" strategy. Every time you like or comment, the frontend immediately re-pulls the latest data. This ensures the leaderboard updates instantly without the risk of the UI getting out of sync.

Challenges:
The biggest hurdle was CORS. Since the browser blocks communication between different ports, I had to configure Django to specifically "trust" the React port. I also manually locked the ports to keep the environment stable.

Future Steps:
If I had more time, I’d implement JWT Authentication so users could have private profiles. I’d also swap SQLite for PostgreSQL to handle higher traffic and more complex data relationships.
