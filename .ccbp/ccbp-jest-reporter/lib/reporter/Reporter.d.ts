import { Logger } from "../utils/Logger";
import { IJestStareConfig } from "../processor/doc/IJestStareConfig";
import { Config } from "@jest/types";
import { AggregatedResult, TestResult } from "@jest/test-result";
import { Test, Context, ReporterOnStartOptions } from "@jest/reporters";
interface ResultsType extends AggregatedResult {
    id?: string;
}
export declare class Reporter {
    mGlobalConfig: Config.InitialOptions;
    private mOptions;
    private mJestStareConfig;
    private mLog;
    private mEnvSrv;
    private mLogOption;
    constructor(mGlobalConfig: Config.InitialOptions, mOptions: IJestStareConfig);
    onRunStart(results: ResultsType, options: ReporterOnStartOptions): void;
    onTestStart(test: Test): void;
    onTestResult(test: Test, testResult: TestResult, results: AggregatedResult): void;
    onRunComplete(contexts: Set<Context>, results: AggregatedResult): void;
    get jestStareConfig(): IJestStareConfig;
    set jestStareConfig(config: IJestStareConfig);
    set logger(logger: Logger);
    get logger(): Logger;
}
export {};
