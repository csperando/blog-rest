import { BaseService } from "./Base.service";
import winston from "winston";
import { iConfig } from "../config";

export class ImgurSingleton extends BaseService {
    private static instance: ImgurSingleton;
    private static repo: any;
    private static props: any;
    private static accessToken: string;

    private constructor() {
        super();
    }

    public static async getInstance(config: iConfig): Promise<ImgurSingleton> {
        BaseService.config = config;

        if(!ImgurSingleton.instance) {
            winston.info("New Imgur service instance created.");
            ImgurSingleton.instance = new ImgurSingleton();
        }

        ImgurSingleton.props = {
            "basePath": "https://api.imgur.com/",
            "oauth": "https://api.imgur.com/oauth2/",
            "key": config.imgur_client_id,
        };

        return ImgurSingleton.instance;
    }

    public async getAccessToken() {
        try {
            const endpoint = ImgurSingleton.props.oauth + "token";
            const req = {};
            const options = {
                body: JSON.stringify(req),
            };

            const res = fetch(endpoint, options);

            return res;

        } catch(err: any) {
            throw(err);
        }
    }

}
