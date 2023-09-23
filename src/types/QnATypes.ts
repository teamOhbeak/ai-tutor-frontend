export type QnAListType = {
  id: number;
  title: string;
  username: string;
  createdAt: string;
};

export type newQnARoomType = {
  title: string;
};

export type qnaType = {
  id: number;
  question: string;
  answer: string;
  sequence: number;
  code?: any;
  language?: string;
};

export type qnaRoomType = {
  id: number;
  title: string;
  username: string;
  createdAt: string;
  qnas: qnaType[];
};

export type newQuestionType = {
  roomId: number;
  question: string;
};

export type CommentType = {
  owner: string;
  comment: string;
};
