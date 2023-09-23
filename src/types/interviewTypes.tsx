export type InterviewListType = {
  id: number;
  createdAt: string;
  userName: string;
  status: string;
};

export type InterviewSettingType = {
  stack: string;
  questionCount: number;
  maxWait: number;
  record: boolean;
};

export type InterviewFollowUpAnswerType = {
  answerId: number;
  answerText: string;
  questionId: number;
  createdAt: string;
};

export type InterviewFollowUpQuestionType = {
  questionId: number;
  mainAnswerId: number;
  mainQuestionId: number;
  questionText: string;
  status: number;
  interviewId: number;
  startedAt: string;
  finishedAt: string;
  answer: InterviewAnswerType | null;
};

export type InterviewAnswerType = {
  answerId: number;
  answerText: string;
  questionId: number;
  createdAt: string;
  followupQuestions?: InterviewFollowUpQuestionType[] | null;
};

export type InterviewQuestionType = {
  questionId: number;
  questionText: string;
  sequence: number;
  status: number;
  interviewId: number;
  startedAt: string;
  finishedAt: string;
  answer: InterviewAnswerType | null;
};

// export type InterviewRoomType = {
//   id: number;
//   createdAt: string;
//   stack: string;
//   questionCount: number;
//   questions: InterviewQuestionType[];
//   maxWait: number;
//   record: boolean;
//   status: string;
//   username: string;
//   userId: number;
// };

// export type InterviewAnswerType = {
//   contents: string;
//   createdAt: string;
// };

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

export type InterviewFollowUpQType = {
  answerText: string;
  finishedAt: string;
  mainQuestionId: number;
  questionId: number;
  questionText: string;
  startedAt: string;
  status: number;
};

export type InterviewQType = {
  answerText: string;
  finishedAt: string;
  followUpQuestions: InterviewFollowUpQType[];
  mainQuestionId: number | null;
  questionId: number;
  questionText: string;
  startedAt: string;
  status: number;
};

export type InterviewRoomType = {
  createdAt: string;
  id: number;
  maxWait: number;
  questionCount: number;
  questions: InterviewQType[];
  record: boolean;
  stack: string;
  status: number;
  userId: number;
  userName: string;
};

export type PostInterviewQuestionsType = {
  interviewId: number;
  questionId: number;
  answerText: string;
};

export type PatchInterviewQuestionsType = {
  interviewId: number;
  questionId: number;
};
