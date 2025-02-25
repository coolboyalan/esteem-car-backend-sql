import LoanQueryService from "#services/loanQuery";
import httpStatus from "http-status";
import { sendResponse } from "#utils/response";
import asyncHandler from "#utils/asyncHandler";

export const get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await LoanQueryService.get(id, req.query);
  sendResponse(httpStatus.OK, res, data, "Record fetched successfully");
});

export const create = asyncHandler(async (req, res, next) => {
  const createdData = await LoanQueryService.create(req.body);
  sendResponse(
    httpStatus.CREATED,
    res,
    createdData,
    "Record created successfully",
  );
});

export const update = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const updatedDoc = await LoanQueryService.update(id, req.body);
  sendResponse(httpStatus.OK, res, updatedDoc, "Record updated successfully");
});

export const deleteDoc = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await LoanQueryService.deleteDoc(id);
  sendResponse(httpStatus.OK, res, null, "Record deleted successfully");
});
