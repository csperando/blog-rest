import { BaseService } from "./Base.service";
import AnalyticsRepository from "../repository/AnalyticsRepository";
import winston from "winston";

import jwt, { JwtPayload } from "jsonwebtoken";
import { iConfig } from "../config";

export class AnalyticsSingleton extends BaseService {
    private static instance: AnalyticsSingleton;
    private static repo: any;
    private static jwt_key: string;

    private constructor() {
        super();
    }

    public static async getInstance(config: iConfig): Promise<AnalyticsSingleton> {
        BaseService.config = config;
        AnalyticsSingleton.repo = await AnalyticsRepository.repo();

        if(!AnalyticsSingleton.instance) {
            winston.info("New Auth service instance created.");
            AnalyticsSingleton.instance = new AnalyticsSingleton();
        }

        AnalyticsSingleton.jwt_key = BaseService.config.jwt_key;

        return AnalyticsSingleton.instance;
    }

    public async logVisitor(data: any): Promise<any> {
        try {
            return await AnalyticsSingleton.repo.logVisitor(data)

        } catch(err: any) {
            // console.log(err);
            throw(err);
        }
    }
}
