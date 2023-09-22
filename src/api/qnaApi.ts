import { newQnARoomType, newQuestionType } from "../types/QnATypes";
import { instance } from "./api";

export const getQnARooms = async () => {
  try {
    const res = await instance.get(`/api/qna-rooms`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getQnARoom = async (id: string) => {
  try {
    const res = await instance.get(`/api/qna-rooms/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postQnARoom = async (data: newQnARoomType) => {
  try {
    const res = await instance.post(`/api/qna-rooms`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteQnARoom = async (id: string) => {
  try {
    await instance.delete(`/api/qna-rooms/${id}`);
  } catch (err) {
    throw err;
  }
};

export const getQnA = async (id: string) => {
  try {
    const res = await instance.get(`/api/qna-rooms/${id}/questions`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const postQnA = async (id: string, data: newQuestionType) => {
  try {
    const res = await instance.post(`/api/qna-rooms/${id}/questions`, data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
