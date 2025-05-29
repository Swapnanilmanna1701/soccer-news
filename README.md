# Football Tracker

A modern football matches tracking application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏆 Multiple league support (Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League, Saudi Pro League)
- ⚡ Real-time match data from Football-Data.org API
- 📱 Responsive design with mobile-first approach
- 🎨 Modern UI with black and green gradient theme
- 🔄 Live match updates and schedules
- 📅 Organized by Today, Tomorrow, and Next 7 Days

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd football-tracker
\`\`\`

2. Install dependencies using npm:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Football-Data.org API key:
\`\`\`
FOOTBALL_API_KEY=your_api_key_here
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm start` - Runs the built app in production mode
- `npm run lint` - Runs the linter
- `npm run type-check` - Runs TypeScript type checking

## API Integration

This application uses the Football-Data.org API to fetch real-time match data. You'll need to:

1. Sign up at [Football-Data.org](https://www.football-data.org/)
2. Get your free API key
3. Add it to your `.env.local` file

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: npm

## Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
│   ├── api.ts            # API functions
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── public/               # Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
