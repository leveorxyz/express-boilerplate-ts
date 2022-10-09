import configs from "./defaults";
import authMiddleware from "./middleware";
import router from "./routers";

export const jwtConfigs = configs;

export const jwtRouters = router;

export const jwtMiddleware = authMiddleware;