import configs from "./defaults";
import routers from "./routers";
import authMiddleware from "./middleware";

export const httpConfigs = configs;

export const httpRouters = routers;

export const httpMiddleware = authMiddleware;