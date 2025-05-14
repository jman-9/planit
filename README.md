# PlanIt

A personal task planner built with React, TypeScript, and Vite.

## Features

- Task tracking with status and dates
- Bucket list management
- State management with Redux Toolkit
- REST-style API abstraction over local storage
- Modular UI built with Tailwind CSS V4 (currently retaining some legacy styled-components)
- Responsive design for all devices
- Clean project structure for easy scaling

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Styling**: styled-components (migrating to Tailwind CSS)
- **State Management**: Redux Toolkit

## Project Structure

```
src/
├── components/     # Reusable UI components
├── features/      # Feature-specific components
├── hooks/         # Custom React hooks
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
├── ui/            # UI components and styles
└── utils/         # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jman/planit.git
cd planit
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Contributing

Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
