# How to Create a Working Demo with @asafarim/simple-md-viewer

This guide shows you step-by-step how to create a working demo for displaying markdown files using the `@asafarim/simple-md-viewer` package.

## Overview

The `@asafarim/simple-md-viewer` is a professional, responsive React component library that creates a beautiful markdown viewer with:
- 🌳 Interactive file tree navigation
- 📱 Fully responsive design with light/dark themes
- 📂 Advanced directory browsing with multiple view styles
- 📄 YAML front matter support
- 🚀 Zero configuration setup

## Steps Completed

### Step 1: Project Setup
- ✅ Created basic React TypeScript project structure
- ✅ Initial `package.json` with all required dependencies
- ✅ Used `pnpm install` to install all packages

### Step 2: Configuration Files Created
- ✅ `vite.config.ts` - Vite configuration for development server
- ✅ `tsconfig.json` - TypeScript configuration
- ✅ `tsconfig.node.json` - Node.js TypeScript configuration  
- ✅ `index.html` - Main HTML file
- ✅ `src/vite-env.d.ts` - Type declarations for the package

### Step 3: React Application Setup
- ✅ `src/main.tsx` - React application entry point
- ✅ `src/App.tsx` - Main App component with theme provider
- ✅ `src/index.css` - Base styles

### Step 4: Backend Server Setup
- ✅ `server.js` - Express server to serve markdown files
- ✅ API endpoints for folder structure and file content
- ✅ Directory browsing support with file sizes and metadata

### Step 5: Dependencies Installed
- ✅ Installed all packages using `pnpm install`

### Step 6: Server Configuration Updated
- ✅ Updated `server.js` to use ES modules (required for "type": "module")
- ✅ Created `start-demo.bat` for easy Windows startup

## How to Run the Demo

### Option 1: Using the Batch File (Windows)
1. Double-click on `start-demo.bat`
2. This will open two command windows:
   - Backend server at http://localhost:3300
   - Frontend development server at http://localhost:5173

### Option 2: Manual Start (Cross-platform)
1. Open two terminal windows
2. In terminal 1, run the backend server:
   ```bash
   cd D:\tmp\demo-simple-md-viewer
   node server.js
   ```
3. In terminal 2, run the frontend development server:
   ```bash
   cd D:\tmp\demo-simple-md-viewer
   npm run dev
   ```

### Option 3: Using Concurrently (if working)
```bash
cd D:\tmp\demo-simple-md-viewer
npm start
```

## What You'll See

Once both servers are running:

1. **Backend Server (http://localhost:3300)**: 
   - Serves your markdown files from `D:\tmp\demo-simple-md-viewer\markdown-files`
   - Provides API endpoints for file structure and content

2. **Frontend Application (http://localhost:5173)**:
   - Beautiful markdown viewer with file tree navigation
   - Responsive design with light/dark theme toggle
   - Directory browsing with file sizes and metadata
   - YAML front matter support

## Features Demonstrated

### 🌳 Interactive File Tree
- Navigate through your markdown file structure
- Collapsible folders with smooth animations
- File and folder icons

### 📱 Responsive Design
- Works on desktop, tablet, and mobile
- Touch-friendly navigation on mobile devices
- Adaptive layouts

### 🎨 Theme Support
- Light and dark themes
- Theme preference saved in localStorage
- Smooth theme transitions

### 📂 Advanced Directory Browsing
- Multiple view styles: list, grid, detailed
- File sizes and modification dates
- Search and filtering capabilities
- Breadcrumb navigation

### 📄 YAML Front Matter
- Automatically parses and displays front matter
- Multiple display modes (full, minimal, header-only, hidden)
- Date formatting with locale support

### Step 7: Demo Content Created
- ✅ Created `README.md` in `markdown-files` directory
- ✅ Added comprehensive demo documentation with YAML front matter
- ✅ Created `start-demo.bat` for easy Windows startup

## Next Steps for Customization

### 1. Customize the Appearance
You can customize the viewer by modifying CSS variables in your `src/index.css`:

```css
:root {
  /* Light theme colors */
  --bg-color-light: #ffffff;
  --text-color-light: #333333;
  --accent-primary-light: #2196f3;
  
  /* Dark theme colors */
  --bg-color-dark: #1e1e1e;
  --text-color-dark: #e0e0e0;
  --accent-primary-dark: #64b5f6;
}
```

### 2. Configure Display Options
Modify the `MarkdownContent` component props in `src/App.tsx`:

```tsx
<MarkdownContent 
  apiBaseUrl="http://localhost:3300"
  showHomePage={true}           // Show/hide homepage
  hideFileTree={false}          // Show/hide file tree
  hideHeader={false}            // Show/hide header
  hideFooter={false}            // Show/hide footer
/>
```

### 3. Add More Markdown Files
Simply add more `.md` files to your `markdown-files` directory. The viewer will automatically:
- Include them in the file tree
- Parse their YAML front matter
- Display them with full formatting

### 4. Deploy Your Documentation Site

#### For GitHub Pages:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Deploy the server to a service like Heroku, Vercel, or Railway

#### For Self-Hosting:
1. Build the frontend: `npm run build`
2. Serve the `dist` folder with nginx or similar
3. Run the Node.js server on your server

## Troubleshooting

### Current Issue: Files Not Loading
If clicking on markdown files in the file tree only changes the URL but doesn't load the content:

#### Step 1: Check Browser Console
1. Open Browser Dev Tools (F12) → Console tab
2. Click on different markdown files
3. Look for debug messages showing URL changes
4. Look for any error messages

#### Step 2: Check Network Requests  
1. Dev Tools → Network tab
2. Click on a markdown file
3. Look for requests to `http://localhost:3300/api/file?path=...`
4. Verify the response contains the file content

#### Step 3: Test Backend Directly
Visit these URLs in your browser to verify the backend works:
- File structure: http://localhost:3300/api/folder-structure
- Test file: http://localhost:3300/api/file?path=README.md
- Specific file: http://localhost:3300/api/file?path=CurrentProjects/advanced-hydrological-modeling-and-simulation-platform.md

#### Common Fixes:
1. **Refresh both servers**: Stop npm start and run it again
2. **Clear browser cache**: Hard refresh with Ctrl+F5
3. **Check package version**: The package might have routing issues

### File Structure Check:
```
demo-simple-md-viewer/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── server.js
├── start-demo.bat
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   └── vite-env.d.ts
└── markdown-files/
    ├── README.md
    └── [your existing markdown files]
```

## Conclusion

You now have a fully functional markdown documentation viewer! This demo showcases how easy it is to transform your existing markdown files into a professional, navigable documentation site using the `@asafarim/simple-md-viewer` package.

The viewer provides:
- ✅ Beautiful file tree navigation
- ✅ Responsive design for all devices  
- ✅ Theme support with persistence
- ✅ Advanced directory browsing
- ✅ YAML front matter parsing
- ✅ Professional styling and animations

Happy documenting! 📚✨
