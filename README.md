# 🎁 AI-Powered Gift Recommender

An intelligent gift recommendation system built with React, TypeScript, and Supabase, powered by Google's Gemini AI API to deliver personalized gift suggestions based on personality traits and preferences.

## ✨ Features

### Core Functionality
- **Gender-based Personalization** - Tailored gift suggestions based on user gender
- **25-Question Personality Survey** - Comprehensive assessment of preferences and traits
- **AI-Powered Rankings** - Intelligent ranking using Google's Gemini API
- **Interactive Chat Interface** - Natural conversation for refining suggestions
- **Quiz Sharing** - Generate and share personality quizzes with others
- **Shipping Information Management** - Capture and store delivery details

### Technical Highlights
- Real-time AI processing with Gemini API
- Dynamic survey generation
- Secure quiz link sharing
- Responsive design with Tailwind CSS
- Supabase for backend services and authentication

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Supabase account
- Google Cloud account for Gemini API access

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/gift-recommender.git
cd gift-recommender
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file with your configuration
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server
```bash
npm run dev
```

The application should now be running on `http://localhost:5173`

## 🛠 Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- React Query for data fetching

### Backend Services
- Supabase for:
  - Authentication
  - Database
  - Real-time subscriptions
  - Storage
- Google's Gemini AI API for gift recommendations

## 📦 Project Structure
```
gift-recommender/
├── src/
│   ├── components/
│   ├── assets/
│   ├── lin/
│   │   ├── supabase.ts/
│   │   └── gemini.ts/
│   └── App.tsx
├── public/
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🔧 Environment Variables
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🚀 Deployment
This project can be deployed to platforms like Vercel, Netlify, or any other static site host. Make sure to:
1. Configure your environment variables in your hosting platform
2. Set up build commands appropriately
3. Configure Supabase security policies for production

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Authors
- Raj Desai
- Vitthal Sawant 
## 🙏 Acknowledgments
- Supabase team for the amazing backend-as-a-service
- Google's Gemini AI team
- The React and TypeScript communities
