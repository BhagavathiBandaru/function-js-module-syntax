import { AggregatedResult, AssertionResult } from "@jest/test-result";
interface ResultsType extends AggregatedResult {
    id?: string;
}
export declare class TestSuite {
    static readonly JOIN_CHAR = ".";
    static create(results: ResultsType): HTMLElement[];
    static asignStatus(testStatusClass: string, result: AssertionResult, testSectionStatus: Map<string, string>): string;
    private static getStatusClassFromJestStatus;
    private static mixStatus;
    private static buildAccordionCard;
    private static buildAccordionCardHeader;
    private static buildAccordionCardBody;
    private static sanitizeFilePath;
}
export {};
