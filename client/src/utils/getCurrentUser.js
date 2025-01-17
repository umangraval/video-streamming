import API from "../API";

async function getCurrentUser() {
  try {
    const res = await API.get(`/current`);
    console.log("current", res);
    return res.data;
  } catch (error) {
    return undefined;
  }
}

export default getCurrentUser;
