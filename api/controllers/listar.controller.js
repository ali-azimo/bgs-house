import Listing from "../models/listar.model.js";
import { errorHandler } from "../utils/erros.js";

export const createListing = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own lsiting'));
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing deleted');
    } catch (error) {
        next(error);
    }
}

export const updateListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(401, "Lisnting not found"));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only Update yoour own listing"));
    }
    try {
        const updateListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );
        res.status(200).json(updateListing);
    } catch (error) {
        next(error);
    }
}

export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

//Pesquisar
export const getListings = async(req, res, next) => {
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
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'created_at';
        const order = req.query.order || 'desc';


        const listings = await Listing.find({
                name: { $regex: searchTerm, $options: 'i' },
                offer,
                finished,
                parking,
                type,
            })
            .sort({
                [sort]: order
            })
            .limit(limit)
            .skip(startIndex);
        return res.status(200).json(listings);

    } catch (error) {
        next(error);
    }
}