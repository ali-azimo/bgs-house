import Imo from '../models/imo.model.js';
import Saude from '../models/saude.model.js';
import Agri from '../models/agri.model.js';
import Minin from '../models/minin.model.js';
import Diver from '../models/diver.model.js';
import { errorHandler } from "../utils/erros.js";

const modelos = {
  imo: Imo,
  saude: Saude,
  agri: Agri,
  minin: Minin,
  diver: Diver,
};

export const getSem = async (req, res) => {
  try {
    const { tipo, id } = req.params;

    const Modelo = modelos[tipo];
    if (!Modelo) return res.status(400).json({ mensagem: 'Tipo inválido' });

    const itemAtual = await Modelo.findById(id);
    if (!itemAtual) return res.status(404).json({ mensagem: 'Item não encontrado' });

    // Substituído: usa as duas primeiras palavras do nome como termo de busca
    const termo = itemAtual.name.split(' ').slice(0, 2).join(' ');

    const semelhantes = await Modelo.find({
      _id: { $ne: id },
      name: { $regex: termo, $options: 'i' },
    }).limit(4);

    if (!semelhantes || semelhantes.length === 0) {
      return res.status(200).json([]); // retorna array vazio
    }

    res.status(200).json(semelhantes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: 'Erro ao buscar semelhantes' });
  }
};
