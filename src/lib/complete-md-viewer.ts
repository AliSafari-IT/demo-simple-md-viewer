/**
 * Direct imports from package source files
 * This allows us to use the components without having to publish the package
 */

// Import directly from the package source files
import IntegratedMarkdownViewer from '../../package/src/components/IntegratedMarkdownViewer';
import StandaloneMarkdownViewer from '../../package/src/components/StandaloneMarkdownViewer';
import MarkdownContent from '../../package/src/components/MarkdownContent';
import FileTree from '../../package/src/components/FileTree';

// Re-export the components
export {
  IntegratedMarkdownViewer,
  StandaloneMarkdownViewer,
  MarkdownContent,
  FileTree
};
