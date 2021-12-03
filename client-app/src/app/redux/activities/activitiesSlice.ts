import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Activity } from "../../models/activity";
import { RootState } from "../store";
import { fetchActivities, createActivities, removeActivities, patchActivities } from "../../../features/services/activities.service";

type Status = "idle" | "loading" | "failed" | "success";

export interface activitiesState {
  value: Activity;

  status: Status;

  createStatus: Status;
  deleteStatus: Status;
  updateStatus: Status;
}

const initialState : activitiesState = {
  value : {
    id : '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
},
  status: "idle",

  createStatus: "idle",
  deleteStatus: "idle",
  updateStatus: "idle"
};

export const GetActivities = createAsyncThunk("activities/fetchactivities", async () => {
  const response = await fetchActivities();
  return response;
});

export const addActivities = createAsyncThunk("activities/addactivities", async (activities: Activity) => {
  const response = await createActivities(activities);
  return response;
});

export const deleteActivities = createAsyncThunk("activities/deleteactivities", async (activitiesId: number) => {
  const response = await removeActivities(activitiesId);
  return response;
});

export const updateActivities = createAsyncThunk("activities/updateactivities", async (activities: Activity) => {
  const response = await patchActivities(activities);
  return response;
});

export const activitieSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    resetEditStatus: (state) => {
      state.updateStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      /* -------------------------------------------------------------------------- */
      /*                                  GET activities                            */
      /* -------------------------------------------------------------------------- */

      .addCase(GetActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetActivities.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(GetActivities.rejected, (state) => {
        state.status = "failed";
      })

      /* -------------------------------------------------------------------------- */
      /*                                  ADD activities                            */
      /* -------------------------------------------------------------------------- */

      // .addCase(addActivities.pending, (state) => {
      //   state.createStatus = "loading";
      // })
      // .addCase(addActivities.fulfilled, (state, action: any) => {
      //   state.createStatus = "success";
      //   state.value = [action.payload, ...state.value];
      // })
      // .addCase(addActivities.rejected, (state) => {
      //   state.createStatus = "failed";
      // })

      /* -------------------------------------------------------------------------- */
      /*                                DELETE activities                           */
      /* -------------------------------------------------------------------------- */

      // .addCase(deleteActivities.pending, (state) => {
      //   state.deleteStatus = "loading";
      // })
      // .addCase(deleteActivities.fulfilled, (state, action: any) => {
      //   state.deleteStatus = "success";
      //   state.value = state.value.filter((u) => u.id !== action.payload);
      // })
      // .addCase(deleteActivities.rejected, (state) => {
      //   state.deleteStatus = "failed";
      // })

      /* -------------------------------------------------------------------------- */
      /*                                  EDIT activities                           */
      /* -------------------------------------------------------------------------- */

      // .addCase(updateActivities.pending, (state) => {
      //   state.updateStatus = "loading";
      // })
      // .addCase(updateActivities.fulfilled, (state, action: any) => {
      //   state.updateStatus = "success";

      //   state.value.forEach((u) => {
      //     if (u.id === action.payload.id) {
      //       const { title, date, description, category, city, venue } = action.payload;

      //       u.title = title;
      //       u.date = date;
      //       u.description = description;
      //       u.category = category;
      //       u.city = city;
      //       u.venue = venue;
      //     }
      //   });
      // })
      // .addCase(updateActivities.rejected, (state) => {
      //   state.updateStatus = "failed";
      // });
  },
});

export const { resetEditStatus } = activitieSlice.actions;

export const selectActivitiesRedux = (state: RootState) => state.activities;

export default activitieSlice.reducer;
