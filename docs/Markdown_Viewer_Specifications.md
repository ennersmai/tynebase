# TyneBase Markdown Viewer & Rendering Specifications

## Overview

TyneBase implements a comprehensive markdown viewing and rendering system that supports both read-only document viewing and interactive editing. The system uses TipTap (based on ProseMirror) for rich editing capabilities while maintaining markdown as the core format for storage and compatibility.

## 1. Markdown Rendering Architecture

### 1.1 Content Storage Strategy

**Storage Formats:**
- **Primary**: Markdown (for AI processing and version control)
- **Editor**: ProseMirror JSON (for rich editing state)
- **Display**: Rendered HTML (for viewer components)

**Content Type Support:**
```typescript
type ContentType = 'markdown' | 'html' | 'prosemirror';

interface DocumentContent {
  title: string;
  content: string;              // Original content (Markdown, HTML, or ProseMirror JSON)
  content_type: ContentType;    // Storage format identifier
}
```

### 1.2 Markdown Normalization Pipeline

All documents are normalized to Markdown format for consistent processing:

**Why Markdown Normalization?**
- **Structure preservation**: Headings, tables, lists survive processing
- **LLM-friendly**: Models are trained extensively on Markdown
- **Consistent chunking**: Easier to split at semantic boundaries
- **Rich context**: Bold, links, code blocks provide semantic signals

**Supported Input Formats:**
- **PDFs**: PyMuPDF4LLM for structure preservation
- **DOCX**: Mammoth for style preservation
- **HTML**: Turndown for clean conversion
- **Markdown**: Native support
- **Plain text**: Basic structure wrapping

## 2. Viewer Components

### 2.1 Read-Only Document Viewer

**Component**: `/components/viewer/DocumentViewer.tsx`

**Features:**
- **Clean typography**: Tailwind prose classes for consistent styling
- **Syntax highlighting**: Code blocks with language detection
- **Responsive design**: Mobile-optimized reading experience
- **Dark mode support**: Automatic theme switching
- **Print-friendly**: Optimized CSS for printing

**Styling Configuration:**
```typescript
const VIEWER_CONFIG = {
  // Typography classes
  prose: 'prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none',
  
  // Container styling
  container: 'bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800',
  
  // Content padding
  padding: 'p-4 sm:p-6 lg:p-8',
  
  // Print optimization
  print: 'print:prose print:prose-sm',
};
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DOCUMENT VIEWER                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  📄 Security Best Practices Guide                              ⋯    │  │
│   │                                                                         │  │
│   │  ╭───────────────────────────────────────────────────────────────────╮  │  │
│   │  │  Published • Onboarding • Updated 2 days ago • 5 min read        │  │  │
│   │  ╰───────────────────────────────────────────────────────────────────╯  │  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  # Security Best Practices Guide                                   │  │  │
│   │  │                                                                   │  │  │
│   │  │  Welcome to our comprehensive security guide. This document       │  │  │
│   │  │  covers essential security measures for all team members.        │  │  │
│   │  │                                                                   │  │  │
│   │  │  ## Password Policy                                               │  │  │
│   │  │                                                                   │  │  │
│   │  │  Your password must meet the following requirements:             │  │  │
│   │  │                                                                   │  │  │
│   │  │  - Be at least 12 characters long                                │  │  │
│   │  │  - Include uppercase and lowercase letters                       │  │  │
│   │  │  - Contain numbers and special characters                         │  │  │
│   │  │  - Not be a common password                                       │  │  │
│   │  │                                                                   │  │  │
│   │  │  ```bash                                                         │  │  │
│   │  │  # Example of a strong password                                   │  │  │
│   │  │  StrongP@ssw0rd!2024                                              │  │  │
│   │  │  ```                                                             │  │  │
│   │  │                                                                   │  │  │
│   │  │  ## Two-Factor Authentication                                      │  │  │
│   │  │                                                                   │  │  │
│   │  │  All team members must enable 2FA on their accounts.             │  │  │
│   │  │                                                                   │  │  │
│   │  │  | Provider | Setup Time | Security Level |                       │  │  │
│   │  │  |----------|------------|---------------|                       │  │  │
│   │  │  | Authy   | 2 minutes  | High          |                       │  │  │
│   │  │  | Google  | 3 minutes  | High          |                       │  │  │
│   │  │  | Duo     | 5 minutes  | Very High     |                       │  │  │
│   │  │                                                                   │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   │                                                                         │  │
│   │  ┌───────────────────────────────────────────────────────────────────┐  │  │
│   │  │  📊 Document Health: 92% • 👁 1,234 views • 💬 5 comments        │  │  │
│   │  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                   │  │  │
│   │  │  │   👍 Like   │ │ 💬 Comment  │ │ 🔗 Share    │                   │  │  │
│   │  │  └─────────────┘ └─────────────┘ └─────────────┘                   │  │  │
│   │  └───────────────────────────────────────────────────────────────────┘  │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Interactive Editor Mode

**Component**: `/components/editor/DocumentEditor.tsx`

**Editor Choice**: TipTap (based on ProseMirror)

**Rationale:**
- **Markdown support**: Native markdown import/export
- **Collaborative editing**: Real-time collaboration potential
- **Extensible architecture**: Plugin-based extensions
- **Good mobile support**: Touch-optimized editing

**Key Extensions:**
- **StarterKit**: Basic editing functionality
- **Placeholder**: Input guidance
- **Image**: Image handling and resizing
- **Link**: Smart link management
- **Table**: Resizable tables
- **TaskList**: Interactive checklists
- **CodeBlockLowlight**: Syntax highlighting

**Editor Configuration:**
```typescript
const EDITOR_CONFIG = {
  // Auto-save configuration
  autoSave: {
    enabled: true,
    interval: 30000,        // 30 seconds
    debounce: 2000,         // 2 seconds after typing stops
    showIndicator: true,    // Show "Saving..." indicator
  },
  
  // Conflict detection
  conflictCheck: {
    enabled: true,
    pollInterval: 60000,    // Check for conflicts every 60 seconds
  },
  
  // Undo/Redo limits
  history: {
    depth: 100,
    newGroupDelay: 500,
  },
};
```

**Editor Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           DOCUMENT EDITOR                                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  B I U S • H1 H2 • • • • • • • • • • • • • • • • • • • • • • • • • •   │  │
│   │  [Link] [Image] [Table] [Code] [• List] [☑ Task] [↩️ Undo] [↪️ Redo]      │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  # Security Best Practices Guide                                   │  │
│   │                                                                   │  │
│   │  Welcome to our comprehensive security guide. This document       │  │
│   │  covers essential security measures for all team members.        │  │
│   │                                                                   │  │
│   │  ## Password Policy                                               │  │
│   │                                                                   │  │
│   │  Your password must meet the following requirements:             │  │
│   │                                                                   │  │
│   │  - Be at least 12 characters long                                │  │
│   │  - Include uppercase and lowercase letters                       │  │
│   │  - Contain numbers and special characters                         │  │
│   │  - Not be a common password                                       │  │
│   │                                                                   │  │
│   │  ```bash                                                         │  │
│   │  # Example of a strong password                                   │  │
│   │  StrongP@ssw0rd!2024                                              │  │
│   │  ```                                                             │  │
│   │                                                                   │  │
│   │  |                                                                │  │
│   │                                                                   │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│   ┌─────────────────────────────────────────────────────────────────────────┐  │
│   │  💾 Saved 2 minutes ago • ⚠️ Conflict detected • 👁 Preview • 🖨️ Print │  │
│   └─────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 3. Rendering Features

### 3.1 Typography & Styling

**Prose Classes Configuration:**
- **Base**: `prose` for consistent typography
- **Responsive**: `prose-sm sm:prose lg:prose-lg` for scalable text
- **Dark Mode**: `dark:prose-invert` for theme support
- **Full Width**: `max-w-none` for content flexibility

**Supported Markdown Elements:**
- **Headings**: H1-H6 with proper spacing
- **Paragraphs**: Optimized line height and spacing
- **Lists**: Ordered and unordered with custom styling
- **Links**: Hover states and external link indicators
- **Images**: Responsive with alt text support
- **Code**: Inline and block code with syntax highlighting
- **Tables**: Responsive tables with proper alignment
- **Blockquotes**: Styled quotation blocks
- **Horizontal Rules**: Themed dividers

### 3.2 Code Highlighting

**Implementation**: `@tiptap/extension-code-block-lowlight`

**Supported Languages:**
- JavaScript/TypeScript
- Python
- Bash/Shell
- SQL
- JSON/YAML
- Markdown
- HTML/CSS
- And more...

**Features:**
- **Syntax highlighting**: Language-specific coloring
- **Line numbers**: Optional line numbering
- **Copy button**: One-click code copying
- **Theme support**: Light/dark mode themes

### 3.3 Interactive Elements

**Task Lists:**
- **Checkboxes**: Interactive task completion
- **Nested tasks**: Support for subtasks
- **Progress tracking**: Visual completion indicators

**Links:**
- **Internal links**: Document cross-references
- **External links**: Security attributes (rel="noopener")
- **Auto-detection**: URL and email auto-linking

**Images:**
- **Responsive sizing**: Mobile-optimized display
- **Alt text**: Accessibility support
- **Captions**: Optional image descriptions
- **Lightbox**: Full-screen image viewing

## 4. Performance & Optimization

### 4.1 Rendering Performance

**Optimization Strategies:**
- **Lazy loading**: Code blocks and images load on demand
- **Virtual scrolling**: For long documents
- **Memoization**: Cached rendered content
- **Debounced updates**: Smooth editing experience

### 4.2 Mobile Optimization

**Responsive Features:**
- **Touch targets**: Mobile-friendly interaction areas
- **Viewport optimization**: Proper meta tags
- **Text sizing**: Readable font sizes on small screens
- **Navigation**: Mobile-optimized toolbar

### 4.3 Accessibility

**WCAG Compliance:**
- **Semantic HTML**: Proper heading structure
- **Alt text**: Image descriptions
- **Keyboard navigation**: Full keyboard support
- **Screen reader**: Compatible with assistive technologies
- **Color contrast**: AA compliance for text readability

## 5. Integration Points

### 5.1 AI Integration

**AI-Powered Features:**
- **Content generation**: AI-assisted writing
- **Smart suggestions**: Auto-completion and recommendations
- **Content analysis**: Document health scoring
- **Search integration**: Enhanced document discovery

### 5.2 Collaboration Features

**Real-time Collaboration:**
- **Conflict detection**: Automatic version checking
- **Change tracking**: Visual diff display
- **Comment system**: Inline discussions
- **Version history**: Complete document timeline

### 5.3 Export Capabilities

**Export Formats:**
- **PDF**: Print-optimized PDF generation
- **HTML**: Clean HTML export
- **Markdown**: Original markdown format
- **Word**: DOCX conversion for external sharing

## 6. Security & Privacy

### 6.1 Content Security

**Security Measures:**
- **XSS prevention**: Sanitized HTML output
- **CSP compliance**: Content Security Policy headers
- **Link security**: External link validation
- **File upload**: Secure image handling

### 6.2 Privacy Features

**Privacy Controls:**
- **Access control**: Role-based viewing permissions
- **Data isolation**: Tenant-specific content separation
- **Audit logging**: Document access tracking
- **GDPR compliance**: Right to erasure support

## 7. Configuration & Customization

### 7.1 Theme Customization

**Theme Variables:**
```css
:root {
  --prose-body: theme('colors.gray.700');
  --prose-headings: theme('colors.gray.900');
  --prose-links: theme('colors.blue.600');
  --prose-bold: theme('colors.gray.900');
  --prose-code: theme('colors.pink.600');
  --prose-borders: theme('colors.gray.200');
}

.dark {
  --prose-body: theme('colors.gray.300');
  --prose-headings: theme('colors.white');
  --prose-links: theme('colors.blue.400');
  --prose-bold: theme('colors.white');
  --prose-code: theme('colors.pink.400');
  --prose-borders: theme('colors.gray.700');
}
```

### 7.2 Extension System

**Custom Extensions:**
- **Mermaid diagrams**: Flowchart and diagram support
- **Math equations**: LaTeX mathematical notation
- **Embeds**: Video and audio embedding
- **Custom blocks**: Tenant-specific content types

This comprehensive markdown viewing and rendering system ensures that TyneBase provides an optimal reading and editing experience while maintaining performance, accessibility, and security standards.
