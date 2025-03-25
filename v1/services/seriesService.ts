import { BaseService } from "./Base.service";
import SeriesRepository from "../repository/SeriesRepository";
import { iSeries } from "v1/models/Series";
import winston from "winston";
import { iConfig } from "../config";

export class SeriesSingleton extends BaseService {
    private static instance: SeriesSingleton;
    private static repo: any;

    private constructor() {
        super();
    }

    public static async getInstance(config: iConfig): Promise<SeriesSingleton> {
        BaseService.config = config;
        SeriesSingleton.repo = await SeriesRepository.repo();

        if(!SeriesSingleton.instance) {
            winston.info("New Series service instance created.");
            SeriesSingleton.instance = new SeriesSingleton();
        }

        return SeriesSingleton.instance;
    }

    public async getAllSeries() {
        try {
            const series = await SeriesSingleton.repo.getAllSeries();
            return series;

        } catch(err: any) {
            throw(err);
        }
    }

    public async addNewSeries(series: iSeries) {
        try {
            const n = SeriesSingleton.repo.addNewSeries(series);
            return n;

        } catch(err: any) {
            winston.error(err.message);
            throw(err);
        }
    }

}
