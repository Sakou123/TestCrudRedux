import axios from "axios";
import agent from "../../app/API/agent";
import { Activity } from "../../app/models/activity";

export function fetchActivities() {
  return new Promise<{ data: any }>((resolve, reject) => { 
    agent.Activities.list().then(response => {
      let activities : Activity[] = []
      response.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
    });
  });
}

  export function createActivities(activities: Activity) {
    return new Promise<{ data: any }>((resolve, reject) => {
      axios
        .post("/api/activities", activities)
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  export function removeActivities(activitiesId: number) {
    return new Promise<number>((resolve, reject) => {
      axios
        .post(`/api/activities/${activitiesId}`)
        .then(() => resolve(activitiesId))
        .catch((err) => reject(err));
    });
  }

  export function patchActivities(activities: Activity) {
    return new Promise<{ data: any }>((resolve, reject) => {
      axios
        .post(`/api/activities/${activities.id}`, activities)
        .then((res: any) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

