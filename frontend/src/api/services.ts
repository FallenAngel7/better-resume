import api from './client';
import type {
  PersonalInfo,
  Experience,
  Education,
  Skill,
  SocialLink,
  ProfileTitle,
  LoginResponse,
  Article,
  PagedArticles,
  ArticleFormData,
} from '../types';

export const publicApi = {
  getPersonalInfo: () => api.get<PersonalInfo>('/personalinfo').then((r) => r.data),
  getExperiences: () => api.get<Experience[]>('/experiences').then((r) => r.data),
  getEducations: () => api.get<Education[]>('/educations').then((r) => r.data),
  getSkills: () => api.get<Skill[]>('/skills').then((r) => r.data),
  getSocialLinks: () => api.get<SocialLink[]>('/sociallinks').then((r) => r.data),
  getProfileTitles: () => api.get<ProfileTitle[]>('/profiletitles').then((r) => r.data),
  getArticles: (page = 1, pageSize = 10) =>
    api.get<PagedArticles>('/articles', { params: { page, pageSize } }).then((r) => r.data),
  getArticleBySlug: (slug: string) =>
    api.get<Article>(`/articles/${slug}`).then((r) => r.data),
};

export const authApi = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>('/auth/login', { username, password }).then((r) => r.data),
};

export const adminApi = {
  updatePersonalInfo: (data: Omit<PersonalInfo, 'id' | 'avatarUrl'>) =>
    api.put<PersonalInfo>('/personalinfo', data).then((r) => r.data),

  uploadAvatar: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api.post<{ avatarUrl: string }>('/personalinfo/avatar', form).then((r) => r.data);
  },

  createExperience: (data: Omit<Experience, 'id'>) =>
    api.post<Experience>('/experiences', data).then((r) => r.data),
  updateExperience: (id: number, data: Omit<Experience, 'id'>) =>
    api.put<Experience>(`/experiences/${id}`, data).then((r) => r.data),
  deleteExperience: (id: number) => api.delete(`/experiences/${id}`),

  createEducation: (data: Omit<Education, 'id'>) =>
    api.post<Education>('/educations', data).then((r) => r.data),
  updateEducation: (id: number, data: Omit<Education, 'id'>) =>
    api.put<Education>(`/educations/${id}`, data).then((r) => r.data),
  deleteEducation: (id: number) => api.delete(`/educations/${id}`),

  createSkill: (data: Omit<Skill, 'id'>) =>
    api.post<Skill>('/skills', data).then((r) => r.data),
  updateSkill: (id: number, data: Omit<Skill, 'id'>) =>
    api.put<Skill>(`/skills/${id}`, data).then((r) => r.data),
  deleteSkill: (id: number) => api.delete(`/skills/${id}`),

  createSocialLink: (data: Omit<SocialLink, 'id'>) =>
    api.post<SocialLink>('/sociallinks', data).then((r) => r.data),
  updateSocialLink: (id: number, data: Omit<SocialLink, 'id'>) =>
    api.put<SocialLink>(`/sociallinks/${id}`, data).then((r) => r.data),
  deleteSocialLink: (id: number) => api.delete(`/sociallinks/${id}`),

  createProfileTitle: (data: Omit<ProfileTitle, 'id'>) =>
    api.post<ProfileTitle>('/profiletitles', data).then((r) => r.data),
  updateProfileTitle: (id: number, data: Omit<ProfileTitle, 'id'>) =>
    api.put<ProfileTitle>(`/profiletitles/${id}`, data).then((r) => r.data),
  deleteProfileTitle: (id: number) => api.delete(`/profiletitles/${id}`),

  getArticles: () => api.get<Article[]>('/articles/admin').then((r) => r.data),
  createArticle: (data: ArticleFormData) =>
    api.post<Article>('/articles', data).then((r) => r.data),
  updateArticle: (id: number, data: ArticleFormData) =>
    api.put<Article>(`/articles/${id}`, data).then((r) => r.data),
  deleteArticle: (id: number) => api.delete(`/articles/${id}`),
};
