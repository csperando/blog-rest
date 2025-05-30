import { iSeries, Series } from "../models/Series";

// define the type of the return object from the repo() method
export interface iSeriesRepo {
    getAllSeries: () => Promise<iSeries[] | null>;
    getSeriesBySlug: (slug: string) => Promise<any>;
    addNewSeries: (seriesData: iSeries) => Promise<any>;
}

// main repo init function to be called in the service factories
const repo = async (): Promise<iSeriesRepo> => {
    const getAllSeries = async () => {
        try {
            return await Series.find({}).sort({ _id: -1 });

        } catch(err: any) {
            throw(err);
        }
    }

    const getSeriesBySlug = async (slug: string) => {
        try {
            return await Series.find({ slug: slug });

        } catch(err: any) {
            throw(err);
        }
    }

    const addNewSeries = async (seriesData: iSeries) => {
        try {
            return await Series.create(seriesData);

        } catch(err: any) {
            throw(err);
        }
    }

    return {
        getAllSeries,
        getSeriesBySlug,
        addNewSeries,
    }
};

export default { repo };

