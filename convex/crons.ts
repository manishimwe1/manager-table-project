// import { cronJobs } from "convex/server";
// import { internal } from "./_generated/api";
// import { v } from "convex/values";

// const crons = cronJobs();

// crons.daily('showNotification', {
//     minuteUTC:2,
//     hourUTC:12,
// },internal.notification.createNotification,{
//     userId:v.string(),
//     message:v.string(), 
//     seen:v.boolean(),})

// export default crons;