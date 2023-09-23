import {
  InterviewSettingType,
  PatchInterviewQuestionsType,
  PostInterviewQuestionsType,
} from "../types/interviewTypes";
import { instance } from "./api";

type IdDataType = {
  interviewId: string;
  questionId: string;
};

// GET INTERVIEW LIST
export const getInterviews = async () => {
  try {
    const res = await instance.get(`/api/interviews`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// GET INTERVIEW ROOM
export const getInterview = async (id: string) => {
  try {
    const res = await instance.get(`/api/interviews/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// CREATE NEW INTERVIEW ROOM
export const postInterviews = async (data: InterviewSettingType) => {
  try {
    const res = await instance.post(`/api/interviews`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// CANCEL INTERVIEW
export const cancelInterview = async (id: string) => {
  try {
    await instance.put(`/api/interviews/${id}`);
  } catch (err) {
    throw err;
  }
};

// DELETE INTERVIEW
export const deleteInterview = async (id: string) => {
  try {
    await instance.delete(`/api/interviews/${id}`);
  } catch (err) {
    throw err;
  }
};

export const getInterviewQuestions = async (id: string) => {
  try {
    const res = await instance.get(`/api/interviews/${id}/questions`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postInterviewQuestions = async (
  data: PostInterviewQuestionsType
) => {
  try {
    console.log(data);
    const res = await instance.post(
      `/api/interviews/${data.interviewId}/questions/ ${data.questionId}/answer`,
      { answerText: data.answerText }
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const patchInterviewQuestions = async (
  data: PatchInterviewQuestionsType
) => {
  try {
    const res = await instance.patch(
      `/api/interviews/${data.interviewId}/questions/ ${data.questionId}/answer`
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
