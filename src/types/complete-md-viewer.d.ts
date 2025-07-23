import { FC } from 'react';

export interface MarkdownViewerProps {
  apiBaseUrl: string;
  showHomePage?: boolean;
  hideFileTree?: boolean;
  useExternalRouter?: boolean;
  className?: string;
  style?: React.CSSProperties;
  basePath?: string;
}

export interface MarkdownContentProps {
  content: string;
  frontMatter?: Record<string, any> | null;
  className?: string;
}

export interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: TreeNode[];
}

export interface FileTreeProps {
  data: TreeNode[];
  selectedPath?: string;
  onFileSelect: (path: string) => void;
  className?: string;
}
