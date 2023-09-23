import { instance } from "./api";
import { newQnARoomType, newQuestionType } from "../types/QnATypes";

// GET QNA LIST
export const getQnARooms = async () => {
  try {
    const res = await instance.get(`/api/qna-rooms`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// GET QNA ROOM
export const getQnARoom = async (id: string) => {
  try {
    const res = await instance.get(`/api/qna-rooms/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// CREATE QNA ROOM
export const postQnARoom = async (data: newQnARoomType) => {
  try {
    const res = await instance.post(`/api/qna-rooms`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// DELETE QNA ROOM
export const deleteQnARoom = async (id: string) => {
  try {
    await instance.delete(`/api/qna-rooms/${id}`);
  } catch (err) {
    throw err;
  }
};

// GET ANSWER
export const getQnA = async (id: string) => {
  try {
    const res = await instance.get(`/api/qna-rooms/${id}/questions`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// ASK QUESTION
export const postQnA = async (data: newQuestionType) => {
  try {
    const res = await instance.post(
      `/api/qna-rooms/${data.roomId}/questions`,
      data
    );
    return res.data;
  } catch (err) {
    throw err;
  }
};
