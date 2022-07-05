"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const util_1 = require("util");
const Constants_1 = require("./Constants");
const IJestStareConfig_1 = require("./doc/IJestStareConfig");
const EnvVars_1 = require("./EnvVars");
const IO_1 = require("../utils/IO");
class Config {
    constructor(mLogger, mExplicitConfig, mProcessParms) {
        this.mLogger = mLogger;
        this.mExplicitConfig = mExplicitConfig;
        this.mProcessParms = mProcessParms;
    }
    buildConfig() {
        const packageJsonConfig = this.getJestStareConfig();
        const envVars = new EnvVars_1.EnvVars();
        const mergedEnvAndPackageJsonConfig = envVars.resolve(packageJsonConfig, envVars.read());
        const config = this.mExplicitConfig || mergedEnvAndPackageJsonConfig;
        if (this.mExplicitConfig != null) {
            Object.keys(mergedEnvAndPackageJsonConfig).forEach((key) => {
                if (util_1.isNullOrUndefined(this.mExplicitConfig[key]) && !util_1.isNullOrUndefined(mergedEnvAndPackageJsonConfig[key])) {
                    config[key] = mergedEnvAndPackageJsonConfig[key];
                }
            });
        }
        if (config.resultDir == null) {
            config.resultDir = Constants_1.Constants.DEFAULT_RESULTS_DIR;
        }
        if (config.resultDir[config.resultDir.length - 1] !== "/") {
            config.resultDir += "/";
        }
        if (!util_1.isNullOrUndefined(config.log)) {
            this.mLogger.on = config.log;
        }
        if (!util_1.isNullOrUndefined(this.mExplicitConfig)) {
            if (this.mProcessParms && this.mProcessParms.reporter) {
            }
            else {
                this.mLogger.info(Constants_1.Constants.OVERRIDE_JEST_STARE_CONFIG);
            }
        }
        if (util_1.isNullOrUndefined(config.resultHtml)) {
            this.mLogger.debug("Setting to default resultHtml");
            config.resultHtml = Constants_1.Constants.MAIN_HTML;
        }
        else {
            if (config.resultHtml.indexOf(Constants_1.Constants.HTML_EXTENSION) === -1) {
                config.resultHtml = config.resultHtml + Constants_1.Constants.HTML_EXTENSION;
            }
        }
        if (util_1.isNullOrUndefined(config.resultJson)) {
            config.resultJson = Constants_1.Constants.RESULTS_RAW;
        }
        return config;
    }
    getJestStareConfig() {
        const packageJsonObject = IO_1.IO.readPackageJson();
        if (packageJsonObject[IJestStareConfig_1.PACKAGE_JSON_KEY] == null) {
            return {};
        }
        else {
            return packageJsonObject[IJestStareConfig_1.PACKAGE_JSON_KEY];
        }
    }
}
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb2Nlc3Nvci9Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXlDO0FBQ3pDLDJDQUF3QztBQUN4Qyw2REFBNEU7QUFDNUUsdUNBQW9DO0FBR3BDLG9DQUFpQztBQU9qQyxNQUFhLE1BQU07SUFPZixZQUFvQixPQUFlLEVBQVUsZUFBaUMsRUFBVSxhQUE0QjtRQUFoRyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWtCO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDO0lBT2xILFdBQVc7UUFHZCxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBR3BELE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzlCLE1BQU0sNkJBQTZCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUd6RixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxJQUFJLDZCQUE2QixDQUFDO1FBR3JFLElBQUksSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLEVBQUU7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2RCxJQUFJLHdCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHdCQUFpQixDQUFDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ3hHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDcEQ7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUMxQixNQUFNLENBQUMsU0FBUyxHQUFHLHFCQUFTLENBQUMsbUJBQW1CLENBQUM7U0FDcEQ7UUFFRCxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO1NBQzNCO1FBS0QsSUFBSSxDQUFDLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1NBQ2hDO1FBSUQsSUFBSSxDQUFDLHdCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUcxQyxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7YUFFdEQ7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQzNEO1NBQ0o7UUFFRCxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxVQUFVLEdBQUcscUJBQVMsQ0FBQyxTQUFTLENBQUM7U0FDM0M7YUFBTTtZQUNILElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMscUJBQVMsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFFNUQsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLHFCQUFTLENBQUMsY0FBYyxDQUFDO2FBQ3BFO1NBQ0o7UUFFRCxJQUFJLHdCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QyxNQUFNLENBQUMsVUFBVSxHQUFHLHFCQUFTLENBQUMsV0FBVyxDQUFDO1NBQzdDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQVNPLGtCQUFrQjtRQUN0QixNQUFNLGlCQUFpQixHQUFHLE9BQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMvQyxJQUFJLGlCQUFpQixDQUFDLG1DQUFnQixDQUFDLElBQUksSUFBSSxFQUFFO1lBRTdDLE9BQU8sRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUVILE9BQU8saUJBQWlCLENBQUMsbUNBQWdCLENBQUMsQ0FBQztTQUM5QztJQUNMLENBQUM7Q0FFSjtBQWpHRCx3QkFpR0MifQ==