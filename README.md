# Brizzle - React + Supabase + Vite

A modern React application built with Vite and Supabase, ready for deployment on GitHub and Netlify.

## 🚀 Features

- ⚡ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 19** - Latest React with modern features
- 🗄️ **Supabase** - Backend-as-a-Service for database and authentication
- 🔒 **Environment Variables** - Secure configuration management
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 🚀 **Deployment Ready** - Optimized for GitHub and Netlify

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Backend**: Supabase
- **Styling**: CSS3 with modern features
- **Package Manager**: npm
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A Supabase account and project

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd brizzle-cursor
npm install
```

### 2. Environment Setup

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Update `.env.local` with your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Get Supabase Credentials

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing one
3. Go to Settings → API
4. Copy your Project URL and anon/public key
5. Paste them into your `.env.local` file

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # App header component
│   └── SupabaseTest.jsx # Supabase connection test
├── lib/                # Utility libraries
│   └── supabase.js     # Supabase client configuration
├── App.jsx             # Main app component
├── App.css             # App styles
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm start` - Start preview server (alias for preview)

## 🚀 Deployment

### GitHub Setup

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

### Netlify Deployment

1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Deploy!

### Environment Variables for Production

Make sure to set these in your Netlify dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 🔒 Security Notes

- Never commit `.env.local` or any files containing secrets
- Use environment variables for all sensitive data
- The `.gitignore` file is configured to exclude sensitive files
- Supabase anon key is safe to use in frontend applications

## 🎨 Customization

### Styling
- Modify `src/App.css` for main app styles
- Update `src/index.css` for global styles
- The app uses modern CSS with gradients and glassmorphism

### Components
- Add new components in `src/components/`
- Import and use them in `src/App.jsx`

### Supabase Integration
- Extend `src/lib/supabase.js` for additional Supabase features
- Add authentication, database operations, etc.

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/yourusername/your-repo/issues) page
2. Create a new issue with detailed information
3. Make sure your environment variables are correctly set

---

**Happy coding! 🎉**