import Diver from "../models/diver.model.js";
import { errorHandler } from "../utils/erros.js";

export const createDiver = async (req, res, next) => {
  try {
    const diver = await Diver.create(req.body);
    return res.status(201).json(diver);
  } catch (error) {
    next(error);
  }
};

export const deleteDiver = async (req, res, next) => {
  const diver = await Diver.findById(req.params.id);
  if (!diver) {
    return next(errorHandler(404, 'Publicação não encontrada'));
  }
  if (req.user.id !== diver.userRef) {
    return next(errorHandler(401, 'Podes deletar apenas a tua publicação'));
  }
  try {
    await Diver.findByIdAndDelete(req.params.id);
    res.status(200).json('Publicação deletada com sucesso!');
  } catch (error) {
    next(error);
  }
};

export const updateDiver = async (req, res, next) => {
  const diver = await Diver.findById(req.params.id);
  if (!diver) {
    return next(errorHandler(404, "Publicação não encontrada"));
  }
  if (req.user.id !== diver.userRef) {
    return next(errorHandler(401, "Apenas podes atualizar a tua publicação"));
  }
  try {
    const updatedDiver = await Diver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedDiver);
  } catch (error) {
    next(error);
  }
};

export const getDiver = async (req, res, next) => {
  try {
    const diver = await Diver.findById(req.params.id);
    if (!diver) {
      return next(errorHandler(404, "Publicação não encontrada"));
    }
    res.status(200).json(diver);
  } catch (error) {
    next(error);
  }
};

export const getDivers = async (req, res, next) => {
  try {
    const divers = await Diver.find().sort({ createdAt: -1 });
    res.status(200).json(divers);
  } catch (error) {
    next(error);
  }
};
