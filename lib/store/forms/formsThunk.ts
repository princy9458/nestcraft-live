import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormsData } from "./formsType";

// Fetch all forms
export const fetchAllForm = createAsyncThunk<FormsData[], void, { rejectValue: string }>(
  "forms/fetchAllForm",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/forms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Adding x-tenant-db as seen in other thunks if applicable
          "x-tenant-db": "kp_nestcraft" 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }

      const data = await response.json();

      console.log("get all forms", data.data)
      // Assuming the API returns an array or an object with a data property
      return (data.data || data) as FormsData[];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch forms");
    }
  }
);
