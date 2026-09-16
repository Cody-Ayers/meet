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

  const tokenCheck = accessToken ? await checkToken(accessToken) : null;

  if (!accessToken || tokenCheck?.error) {
    localStorage.removeItem("access_token");

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      try {
        const response = await fetch(
          "https://q0w5lkoaz3.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
        );

        if (!response.ok) {
          throw new Error(`Auth URL request failed: ${response.status}`);
        }

        const result = await response.json();
        const { authUrl } = result;

        if (authUrl) {
          window.location.href = authUrl;
        } else {
          console.error("No authUrl returned:", result);
        }
      } catch (error) {
        console.error("Error fetching auth URL:", error);
      }

      return null;
    }

    return getToken(code);
  }

  return accessToken;
};

export const getEvents = async () => {
  console.log("getEvents called");

  if (window.location.href.startsWith("http://localhost")) {
    console.log("Using mock data");
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  console.log("Token:", token);

  if (!token) {
    console.error("No valid token available");
    return [];
  }

  removeQuery();

  const url = `https://q0w5lkoaz3.execute-api.us-west-1.amazonaws.com/dev/api/get-events/${token}`;

  try {
    const response = await fetch(url);

    console.log("Events response status:", response.status);

    if (!response.ok) {
      throw new Error(`Events request failed: ${response.status}`);
    }

    const result = await response.json();

    console.log("Events API result:", result);

    if (result && result.events && Array.isArray(result.events)) {
      localStorage.setItem("lastEvents", JSON.stringify(result.events));

      return result.events;
    }

    console.error(
      "API response does not contain a valid events array:",
      result
    );

    return [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
