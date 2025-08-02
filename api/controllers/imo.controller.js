import Imo from "../models/imo.model.js";
import { errorHandler } from "../utils/erros.js";

export const createImo = async (req, res, next) => {
  try {
    const imo = await Imo.create(req.body);
    return res.status(201).json(imo);
  } catch (error) {
    next(error);
  }
};

export const deleteImo = async (req, res, next) => {
  const imo = await Imo.findById(req.params.id);
  if (!imo) {
    return next(errorHandler(404, 'Produto não encontrado'));
  }
  if (req.user.id !== imo.userRef) {
    return next(errorHandler(401, 'Podes deletar apenas o seu produto'));
  }
  try {
    await Imo.findByIdAndDelete(req.params.id);
    res.status(200).json('Produto deletado com sucesso!');
  } catch (error) {
    next(error);
  }
};

export const updateImo = async (req, res, next) => {
  const imo = await Imo.findById(req.params.id);
  if (!imo) {
    return next(errorHandler(401, "Produto não encontrado"));
  }
  if (req.user.id !== imo.userRef) {
    return next(errorHandler(401, "Apenas podes atualizar o seu produto"));
  }
  try {
    const updatedImo = await Imo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedImo);
  } catch (error) {
    next(error);
  }
};

export const getImo = async (req, res, next) => {
  try {
    const imo = await Imo.findById(req.params.id);
    if (!imo) {
      return next(errorHandler(404, "Produto não encontrado"));
    }
    res.status(200).json(imo);
  } catch (error) {
    next(error);
  }
};

export const getImos = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let finished = req.query.finished;

    if (finished === undefined || finished === 'false') {
      finished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent', 'build'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'created_at';
    const order = req.query.order || 'desc';

    const imos = await Imo.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      finished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(imos);
  } catch (error) {
    next(error);
  }
};
