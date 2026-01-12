export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string;
  lastUpdated: string;
  tags: string[];
}

export interface DocCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  articles: DocArticle[];
}

export interface DocSection {
  id: string;
  title: string;
  categories: DocCategory[];
}
