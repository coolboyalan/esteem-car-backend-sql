import ContactService from "#services/contact";
import httpStatus from "http-status";
import { sendResponse } from "#utils/response";
import asyncHandler from "#utils/asyncHandler";

export const get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await ContactService.get(id, req.query);
  sendResponse(httpStatus.OK, res, data, "Record fetched successfully");
});

export const create = asyncHandler(async (req, res, next) => {
  const createdData = await ContactService.create(req.body);
  sendResponse(
    httpStatus.CREATED,
    res,
    createdData,
    "Record created successfully",
  );
});

export const update = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const updatedDoc = await ContactService.update(id, req.body);
  sendResponse(httpStatus.OK, res, updatedDoc, "Record updated successfully");
});

export const deleteDoc = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await ContactService.deleteDoc(id);
  sendResponse(httpStatus.OK, res, null, "Record deleted successfully");
});
