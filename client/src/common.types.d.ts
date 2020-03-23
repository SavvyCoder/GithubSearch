export interface ResultData {
  name: string;
  id: number;
  full_name: string;
  description?: string;
  stargazers_count: number;
  watchers: number;
  forks_count: number;
  open_issues: number;
  language: string;
  score: float;
  full_name: string;
  forks: number;
  size: number;
  owner: { avatar_url: string; login: string };
  [key: string]: number;
}
