import { config, iConfig } from "../config";

export abstract class BaseService {
    public static config: iConfig = config;
    
    public sayHello() {
        console.log("Hello!");
    }
}
