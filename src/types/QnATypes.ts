export type QnAListType = {
  id: number;
  title: string;
  username: string;
  createdAt: string;
};

export type newQnARoomType = {
  userId: number;
  title: string;
};

export type newQuestionType = {
  roomId: number;
  question: string;
};

export type CommentType = {
  owner: string;
  comment: string;
};
