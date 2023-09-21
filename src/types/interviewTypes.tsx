export type InterviewListType = {
  id: number;
  createdAt: string;
  username?: string;
  status: string;
};

export type InterviewAnswerType = {
  contents: string;
  createdAt: string;
};

export interface QuestionProps {
  answer: InterviewAnswerType;
  createdAt: string;
  startedAt: string;
  finishedAt: string;
  question: string;
  id: number;
  status: number;
  type: number;
}

export interface InterviewQuestionProps extends QuestionProps {
  followUpQuestions: QuestionProps[];
}

export interface InterviewDetailProps {
  createdAt: string;
  id: number;
  maxWait: number;
  questionCount: number;
  questions: InterviewQuestionProps[];
  stack: number;
  status: number;
  userId: number;
  userName: string;
}
