// src/api.js

import mockData from "./mock-data";

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );

    return await response.json();
  } catch (error) {
    console.error("Token validation failed:", error);
    return { error: true };
  }
};

const removeQuery = () => {
  let newurl;

  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
  }

  window.history.pushState("", "", newurl);
};

const getToken = async (code) => {
  try {
    const encodedCode = encodeURIComponent(code);

    const response = await fetch(
      `https://q0w5lkoaz3.execute-api.us-west-1.amazonaws.com/dev/api/token/${encodedCode}`
    );

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status}`);
    }

    const { access_token } = await response.json();

    if (access_token) {
      localStorage.setItem("access_token", access_token);
    }

    return access_token || null;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");

  const tokenCheck = accessToken
    ? await checkToken(accessToken)
    : null;

  if (!accessToken || tokenCheck?.error) {
    localStorage.removeItem("access
