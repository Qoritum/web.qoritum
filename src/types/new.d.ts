export type NewMetadata = {
  title: string;          
  slug: string;          
  summary: string;       
  keywords?: string[];   
  author: string;        
  date: Date | string;    
  published: boolean;    
  reading_time?: number;

  og_image: string | null
  canonical_url?: string;
  meta_title?: string;
  meta_description?: string;
};
