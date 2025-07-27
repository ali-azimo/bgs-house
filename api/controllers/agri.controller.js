import Agri from "../models/agri.model.js";
import { errorHandler } from "../utils/erros.js";

export const createAgri = async (req, res, next) => {
  try {
    const agri = await Agri.create(req.body);
    return res.status(201).json(agri);
  } catch (error) {
    next(error);
  }
};

export const deleteAgri = async (req, res, next) => {
  const agri = await Agri.findById(req.params.id);
  if (!agri) {
    return next(errorHandler(404, 'Publicação não encontrada'));
  }
  if (req.user.id !== agri.userRef) {
    return next(errorHandler(401, 'Podes deletar apenas o que é teu'));
  }
  try {
    await Agri.findByIdAndDelete(req.params.id);
    res.status(200).json('Publicação deletada com sucesso!');
  } catch (error) {
    next(error);
  }
};

export const updateAgri = async (req, res, next) => {
  const agri = await Agri.findById(req.params.id);
  if (!agri) {
    return next(errorHandler(404, "Publicação não encontrada"));
  }
  if (req.user.id !== agri.userRef) {
    return next(errorHandler(401, "Apenas podes atualizar o que é teu"));
  }
  try {
    const updatedAgri = await Agri.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAgri);
  } catch (error) {
    next(error);
  }
};

export const getAgri = async (req, res, next) => {
  try {
    const agri = await Agri.findById(req.params.id);
    if (!agri) {
      return next(errorHandler(404, "Publicação não encontrada"));
    }
    res.status(200).json(agri);
  } catch (error) {
    next(error);
  }
};

export const getAgris = async (req, res, next) => {
  try {
    const agris = await Agri.find().sort({ createdAt: -1 });
    res.status(200).json(agris);
  } catch (error) {
    next(error);
  }
};
