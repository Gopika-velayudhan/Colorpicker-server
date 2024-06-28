import express from "express";

import {
  AddTest,
  Gettest,
  Updatetest,
  Deletetest,
} from "../controller/Usercontroller.js";


const route = express.Router();
route

  .post("/test", AddTest)
  .get("/test", Gettest)
  .put("/test/:id", Updatetest)
  .delete("/test/:id", Deletetest);

export default route;
