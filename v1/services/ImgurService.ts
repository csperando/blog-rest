/*
    import { iConfig } from "../config";
    import winston from "winston";
    import { ThirdPartyServices } from "./ThirdPartyServices";

    export class ImgurSingleton extends ThirdPartyServices {
        private static instance: ImgurSingleton;
        private static repo: any;

        private constructor() {
            super();
        }

        public static async getInstance(config: iConfig): Promise<ImgurSingleton> {
            ThirdPartyServices.config = config;

            if(!ImgurSingleton.instance) {
                winston.info("New Imgur service instance created.");
                ImgurSingleton.instance = new ImgurSingleton();
            }

            return ImgurSingleton.instance;
        }

        public async getAccountInfo() {
            try {
                const endpoint = "https://api.imgur.com/3/account/kholeman";
                const options = { method: "GET", headers: { "Authorization": `Client-ID ${ImgurSingleton.config.imgur_client_id}`, } };

                return await fetch(endpoint, options)
                    .then((res) => {
                        return res.json();
                    });

            } catch(err: any) {
                throw(err);
            }
        }

        public async uploadImage(imageData: any): Promise<any> {
            try {
                const endpoint = "https://api.imgur.com/3/image";

                const data = new FormData();
                data.append("image", imageData.buffer.toString("base64"));
                data.append("type", "base64");
                data.append("title", imageData.originalname);
                data.append("description", "thumbnail");

                const options = { 
                    method: "POST", 
                    headers: { 
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Client-ID ${ImgurSingleton.config.imgur_client_id}`,
                    }, 
                    body: data };
            
                return await fetch(endpoint, options)
                    .then((res) => {
                        if(!res.ok) {
                            winston.error(`${res.status} - ${res.statusText}`);
                            // throw (new Error("Error uploading image."));
                            return null;
                        }

                        return res.json();
                    });

            } catch(err: any) {
                throw(err);
            }
        }

    }
*/
