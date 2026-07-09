export interface PersonalInfo {
  id: number;
  fullName: string;
  jobTitle: string;
  avatarUrl: string | null;
  aboutMeText: string;
  email: string;
  phone: string;
  location: string;
}

export interface Experience {
  id: number;
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  orderIndex: number;
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  description: string;
  orderIndex: number;
}

export interface Skill {
  id: number;
  name: string;
  proficiencyPercentage: number;
  orderIndex: number;
}

export interface SocialLink {
  id: number;
  platformName: string;
  url: string;
  iconName: string;
}

export interface ProfileTitle {
  id: number;
  title: string;
  orderIndex: number;
}

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  createdAt: string;
}

export interface Article extends ArticleListItem {
  content: string;
  isPublished: boolean;
}

export interface PagedArticles {
  items: ArticleListItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  summary: string;
  content: string;
  isPublished: boolean;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  socialLinks: SocialLink[];
  profileTitles: ProfileTitle[];
}
