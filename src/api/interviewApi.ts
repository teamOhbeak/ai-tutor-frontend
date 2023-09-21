import { instance } from "./api";

export const getInterviews = async () => {
  try {
    const res = await instance.get(`/api/interviews`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getInterview = async (id: string) => {
  try {
    const res = await instance.get(`/api/interviews/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteInterview = async (id: string) => {
  try {
    await instance.delete(`/api/interviews/${id}`);
  } catch (err) {
    throw err;
  }
};
