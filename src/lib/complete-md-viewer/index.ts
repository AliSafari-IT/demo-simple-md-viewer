// Import types
import type {
  MarkdownViewerProps,
  MarkdownContentProps,
  TreeNode,
  FileTreeProps
} from '../../types/complete-md-viewer';

// Import React
import React from 'react';

// Create stub components that will be replaced at runtime
// This is a workaround for TypeScript declaration issues
export const MarkdownViewer: React.FC<MarkdownViewerProps> = () => null;
export const StandaloneMarkdownViewer: React.FC<Omit<MarkdownViewerProps, 'useExternalRouter'>> = () => null;
export const IntegratedMarkdownViewer: React.FC<Omit<MarkdownViewerProps, 'useExternalRouter'>> = () => null;
export const MarkdownContent: React.FC<MarkdownContentProps> = () => null;
export const FileTree: React.FC<FileTreeProps> = () => null;

// Re-export types
export type {
  MarkdownViewerProps,
  MarkdownContentProps,
  TreeNode,
  FileTreeProps
};

// Note: The actual implementation will be loaded from the package
// This file is just for TypeScript type checking
