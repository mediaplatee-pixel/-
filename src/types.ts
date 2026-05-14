export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Educational' | 'YouTube' | 'Corporate' | 'InfoYouTube' | 'Other';
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: number;
}

export interface SiteSettings {
  primaryColor: string;
  secondaryColor: string;
  companyName: string;
  contactEmail: string;
  youtubeUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  teamMeetingImage?: string;
  contentDesignImage?: string;
  oneStopProductionImage?: string;
  diverseExperienceImage?: string;
}
