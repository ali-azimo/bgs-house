import Minin from "../models/minin.model.js";
import { errorHandler } from "../utils/erros.js";

export const createMinin = async (req, res, next) => {
  try {
    const minin = await Minin.create(req.body);
    return res.status(201).json(minin);
  } catch (error) {
    next(error);
  }
};

export const deleteMinin = async (req, res, next) => {
  const minin = await Minin.findById(req.params.id);
  if (!minin) {
    return next(errorHandler(404, 'Minin não encontrado'));
  }
  if (req.user.id !== minin.userRef) {
    return next(errorHandler(401, 'Podes deletar apenas o seu Minin'));
  }
  try {
    await Minin.findByIdAndDelete(req.params.id);
    res.status(200).json('Minin deletado com sucesso!');
  } catch (error) {
    next(error);
  }
};

export const updateMinin = async (req, res, next) => {
  const minin = await Minin.findById(req.params.id);
  if (!minin) {
    return next(errorHandler(404, "Minin não encontrado"));
  }
  if (req.user.id !== minin.userRef) {
    return next(errorHandler(401, "Apenas podes atualizar o seu Minin"));
  }
  try {
    const updatedMinin = await Minin.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMinin);
  } catch (error) {
    next(error);
  }
};

export const getMinin = async (req, res, next) => {
  try {
    const minin = await Minin.findById(req.params.id);
    if (!minin) {
      return next(errorHandler(404, "Minin não encontrado"));
    }
    res.status(200).json(minin);
  } catch (error) {
    next(error);
  }
};

export const getMinins = async (req, res, next) => {
  try {
    const minins = await Minin.find().sort({ createdAt: -1 });
    res.status(200).json(minins);
  } catch (error) {
    next(error);
  }
};
