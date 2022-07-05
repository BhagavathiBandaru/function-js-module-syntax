"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporter = void 0;
const Logger_1 = require("../utils/Logger");
const Processor_1 = require("../processor/Processor");
const EnvVars_1 = require("../processor/EnvVars");
const EnvVarService_1 = require("../utils/EnvVarService");
class Reporter {
    constructor(mGlobalConfig, mOptions) {
        this.mGlobalConfig = mGlobalConfig;
        this.mOptions = mOptions;
        this.mEnvSrv = new EnvVarService_1.EnvVarService(EnvVars_1.EnvVars.ENV_PREFIX);
        this.logger.on = this.mEnvSrv.readBoolEnvValue("LOG");
    }
    onRunStart(results, options) {
    }
    onTestStart(test) {
    }
    onTestResult(test, testResult, results) {
    }
    onRunComplete(contexts, results) {
        if (Object.entries(this.mOptions).length === 0 && this.mOptions.constructor === Object) {
            Processor_1.Processor.run(results, { additionalResultsProcessors: [] }, { reporter: this });
        }
        else {
            this.mOptions.additionalResultsProcessors = [];
            this.mOptions.log = this.mLogOption;
            Processor_1.Processor.run(results, this.mOptions, { reporter: this });
        }
    }
    get jestStareConfig() {
        return this.mJestStareConfig || {};
    }
    set jestStareConfig(config) {
        this.mJestStareConfig = config;
    }
    set logger(logger) {
        this.mLog = logger;
    }
    get logger() {
        if (this.mLog == null) {
            this.logger = new Logger_1.Logger();
        }
        return this.mLog;
    }
}
exports.Reporter = Reporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3J0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVwb3J0ZXIvUmVwb3J0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNENBQXlDO0FBQ3pDLHNEQUFtRDtBQUduRCxrREFBK0M7QUFDL0MsMERBQXVEO0FBbUJ2RCxNQUFhLFFBQVE7SUFzQ2pCLFlBQW1CLGFBQW9DLEVBQVUsUUFBMEI7UUFBeEUsa0JBQWEsR0FBYixhQUFhLENBQXVCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDdkYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLDZCQUFhLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFTTSxVQUFVLENBQUMsT0FBb0IsRUFBRSxPQUErQjtJQUV2RSxDQUFDO0lBT00sV0FBVyxDQUFDLElBQVU7SUFFN0IsQ0FBQztJQVNNLFlBQVksQ0FBQyxJQUFVLEVBQUUsVUFBc0IsRUFBRSxPQUF5QjtJQUVqRixDQUFDO0lBUU0sYUFBYSxDQUFDLFFBQXNCLEVBQUUsT0FBeUI7UUFFbEUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtZQUVwRixxQkFBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSwyQkFBMkIsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ25GO2FBQU07WUFFSCxJQUFJLENBQUMsUUFBUSxDQUFDLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3BDLHFCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDN0Q7SUFDTCxDQUFDO0lBT0QsSUFBVyxlQUFlO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBTUQsSUFBVyxlQUFlLENBQUMsTUFBd0I7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBT0QsSUFBSSxNQUFNLENBQUMsTUFBYztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBUUQsSUFBSSxNQUFNO1FBQ04sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZUFBTSxFQUFFLENBQUM7U0FDOUI7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBbklELDRCQW1JQyJ9