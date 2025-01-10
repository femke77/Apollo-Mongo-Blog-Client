import type { IComment } from "./Comment";

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  username?: string; // not there if single blog view
  dateCreated: string | number;
  comments?: IComment[] | null | [];
  commentCount?: number;
}
