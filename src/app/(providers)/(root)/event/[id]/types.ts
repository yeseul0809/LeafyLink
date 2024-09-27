export interface CommentUser {
  user_name: string;
}

export interface Comment {
  comment_event_id: string;
  comment_id: string;
  comment_user_id: string;
  created_at: string;
  description: string;
  User: {
    user_name: string;
  };
}
