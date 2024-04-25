// frontend/src/api.js

//Axios is a Promise-based HTTP client used to make HTTP requests from the frontend to the server
import axios from 'axios';
import './App.css';

//This defines the base URL of the API endpoint
const API_URL = process.env.REACT_APP_API_URL;

export const fetchLatestAssignments = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/project-assignments`);
    return data;
  } catch (error) {
    console.error("Error fetching assignments", error);
    throw error;
  }
};


