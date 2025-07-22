import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3300;
const mdDocsPath = path.join(__dirname, 'markdown-files'); // Your markdown folder

app.use(cors({ origin: 'http://localhost:5173' }));

// API to return folder structure
app.get('/api/folder-structure', (req, res) => {
  try {
    const folderStructure = getFolderStructure(mdDocsPath);
    res.json({ nodes: folderStructure });
  } catch (error) {
    console.error('Error getting folder structure:', error);
    res.status(500).json({ error: 'Failed to read folder structure' });
  }
});

// API to serve markdown files
app.get('/api/file', (req, res) => {
  try {
    const filePath = path.join(mdDocsPath, req.query.path);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      res.json({ content });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file' });
  }
});

// API to get directory details with file sizes (NEW in v1.5.0)
app.get('/api/directory-details', (req, res) => {
  try {
    const directoryPath = req.query.path || '';
    const fullPath = path.join(mdDocsPath, directoryPath);
    
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
      return res.status(404).json({ error: 'Directory not found' });
    }

    const directoryDetails = getDirectoryDetails(fullPath, directoryPath);
    res.json(directoryDetails);
  } catch (error) {
    console.error('Error reading directory details:', error);
    res.status(500).json({ error: 'Failed to read directory details' });
  }
});

function getFolderStructure(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const result = [];

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    const itemRelativePath = path.join(relativePath, item).replace(/\\/g, '/');

    if (stats.isDirectory()) {
      result.push({
        name: item,
        path: itemRelativePath,
        type: 'folder',
        children: getFolderStructure(itemPath, itemRelativePath)
      });
    } else if (item.endsWith('.md')) {
      result.push({
        name: item,
        path: itemRelativePath,
        type: 'file'
      });
    }
  }

  return result;
}

// Helper functions for directory details (NEW in v1.5.0)
function getDirectoryDetails(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  const children = [];
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    const itemRelativePath = path.join(relativePath, item).replace(/\\/g, '/');
    
    if (stats.isDirectory()) {
      const folderSize = calculateFolderSize(itemPath);
      const itemCount = countItemsInFolder(itemPath);
      
      children.push({
        name: item,
        path: itemRelativePath,
        type: 'folder',
        size: folderSize,
        lastModified: stats.mtime.toISOString(),
        itemCount: itemCount
      });
    } else if (item.endsWith('.md')) {
      children.push({
        name: item,
        path: itemRelativePath,
        type: 'file',
        size: stats.size,
        lastModified: stats.mtime.toISOString(),
        extension: path.extname(item).substring(1)
      });
    }
  }
  
  return {
    name: path.basename(dirPath) || 'root',
    path: relativePath,
    type: 'folder',
    children: children
  };
}

function calculateFolderSize(folderPath) {
  let totalSize = 0;
  
  function traverse(currentPath) {
    try {
      const items = fs.readdirSync(currentPath);
      
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          traverse(itemPath);
        } else {
          totalSize += stats.size;
        }
      }
    } catch (error) {
      // Skip directories we can't read
      console.warn('Could not read directory:', currentPath, error.message);
    }
  }
  
  traverse(folderPath);
  return totalSize;
}

function countItemsInFolder(folderPath) {
  let count = 0;
  
  function traverse(currentPath) {
    try {
      const items = fs.readdirSync(currentPath);
      count += items.length;
      
      for (const item of items) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          traverse(itemPath);
        }
      }
    } catch (error) {
      // Skip directories we can't read
      console.warn('Could not read directory:', currentPath, error.message);
    }
  }
  
  traverse(folderPath);
  return count;
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📁 Serving markdown files from: ${mdDocsPath}`);
});
