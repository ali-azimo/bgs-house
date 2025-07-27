import Saude from "../models/saude.model.js";
import { errorHandler } from "../utils/erros.js";

export const createSaude = async (req, res, next) => {
  try {
    const saude = await Saude.create(req.body);
    return res.status(201).json(saude);
  } catch (error) {
    next(error);
  }
};

export const deleteSaude = async (req, res, next) => {
  const saude = await Saude.findById(req.params.id);
  if (!saude) {
    return next(errorHandler(404, 'Saúde não encontrado'));
  }
  if (req.user.id !== saude.userRef) {
    return next(errorHandler(401, 'Podes deletar apenas o seu item de Saúde'));
  }
  try {
    await Saude.findByIdAndDelete(req.params.id);
    res.status(200).json('Item de Saúde deletado com sucesso!');
  } catch (error) {
    next(error);
  }
};

export const updateSaude = async (req, res, next) => {
  const saude = await Saude.findById(req.params.id);
  if (!saude) {
    return next(errorHandler(404, "Saúde não encontrado"));
  }
  if (req.user.id !== saude.userRef) {
    return next(errorHandler(401, "Apenas podes atualizar o seu item de Saúde"));
  }
  try {
    const updatedSaude = await Saude.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedSaude);
  } catch (error) {
    next(error);
  }
};

export const getSaude = async (req, res, next) => {
  try {
    const saude = await Saude.findById(req.params.id);
    if (!saude) {
      return next(errorHandler(404, "Saúde não encontrado"));
    }
    res.status(200).json(saude);
  } catch (error) {
    next(error);
  }
};

export const getSaudes = async (req, res, next) => {
  try {
    const saudes = await Saude.find().sort({ createdAt: -1 });
    res.status(200).json(saudes);
  } catch (error) {
    next(error);
  }
};
