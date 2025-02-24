import LeadService from "#services/lead";
import asyncHandler from "#utils/asyncHandler";

export const get = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const data = await LeadService.get(id, req.query);
});

export const create = asyncHandler(async (req, res, next) => {
  const createdData = await LeadService.create(req.body);
});

export const update = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const updatedDoc = await LeadService.update(id, req.body);
});

export const deleteDoc = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await LeadService.deleteDoc(id);
});
