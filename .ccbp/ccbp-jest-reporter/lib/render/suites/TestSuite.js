"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSuite = void 0;
const Constants_1 = require("../Constants");
const Test_1 = require("../tests/Test");
class TestSuite {
    static create(results) {
        const elements = [];
        results.testResults.forEach((testResult) => {
            if (testResult.testResults == null) {
                console.error("Unexpected testResults field missing");
                if (testResult.assertionResults != null) {
                    console.warn("Attempting to use assertionResults: results are unpredictable");
                    testResult.testResults = testResult.assertionResults;
                }
            }
            let testStatusClass;
            const testSectionStatus = new Map();
            for (const result of testResult.testResults) {
                testStatusClass = TestSuite.asignStatus(testStatusClass, result, testSectionStatus);
            }
            if (testStatusClass === undefined) {
                testStatusClass = Constants_1.Constants.PASSED_TEST;
            }
            const accordionCard = TestSuite.buildAccordionCard(testResult, testStatusClass);
            const divMap = new Map();
            testResult.testResults.forEach((test) => {
                const element = Test_1.Test.create(test);
                if (test.ancestorTitles.length > 0) {
                    test.ancestorTitles.forEach((title, index) => {
                        const titlesCopy = test.ancestorTitles.slice();
                        titlesCopy.splice(index + 1);
                        const key = titlesCopy.join(TestSuite.JOIN_CHAR);
                        if (divMap.has(key)) {
                            divMap.get(key).appendChild(element);
                        }
                        else {
                            const nestDiv = document.createElement("div");
                            const statusClass = testSectionStatus.get(key) || Constants_1.Constants.PASSED_TEST;
                            nestDiv.classList.add("my-3", "p-3", "bg-white", "rounded", "box-shadow", statusClass);
                            const h6 = document.createElement("h6");
                            h6.classList.add("border-bottom", "pb-2", "mb-0", "display-6");
                            h6.textContent = title;
                            nestDiv.appendChild(h6);
                            nestDiv.appendChild(element);
                            nestDiv.id = key;
                            divMap.set(key, nestDiv);
                            if (index === 0) {
                                accordionCard.querySelector('.card-body').appendChild(nestDiv);
                            }
                            else {
                                titlesCopy.pop();
                                const parentKey = titlesCopy.join(TestSuite.JOIN_CHAR);
                                divMap.get(parentKey).appendChild(nestDiv);
                            }
                        }
                    });
                }
                else {
                    accordionCard.querySelector('.card-body').appendChild(element);
                }
            });
            elements.push(accordionCard);
        });
        return elements;
    }
    static asignStatus(testStatusClass, result, testSectionStatus) {
        const currentStatus = TestSuite.getStatusClassFromJestStatus(result.status);
        if (!testStatusClass) {
            testStatusClass = currentStatus;
        }
        else if (testStatusClass !== currentStatus) {
            testStatusClass = TestSuite.mixStatus(currentStatus, testStatusClass);
        }
        else {
            testStatusClass = currentStatus;
        }
        for (let index = 0; index < result.ancestorTitles.length; index++) {
            const titlesCopy = result.ancestorTitles.slice();
            titlesCopy.splice(index + 1);
            const key = titlesCopy.join(TestSuite.JOIN_CHAR);
            if (testSectionStatus.has(key)) {
                if (testStatusClass !== currentStatus) {
                    testSectionStatus.set(key, TestSuite.mixStatus(currentStatus, testStatusClass));
                }
                else {
                    testSectionStatus.set(key, currentStatus);
                }
            }
            else {
                testSectionStatus.set(key, currentStatus);
            }
        }
        return testStatusClass;
    }
    static getStatusClassFromJestStatus(jestStatus) {
        if (jestStatus === Constants_1.Constants.TEST_STATUS_PEND) {
            return Constants_1.Constants.PENDING_TEST;
        }
        else if (jestStatus === Constants_1.Constants.TEST_STATUS_FAIL) {
            return Constants_1.Constants.FAILED_TEST;
        }
        else {
            return Constants_1.Constants.PASSED_TEST;
        }
    }
    static mixStatus(currentStatus, oldStatus) {
        const statusArray = oldStatus.split(TestSuite.JOIN_CHAR);
        statusArray.push(currentStatus);
        const sortedUniqueStatusArray = [...new Set(statusArray)].sort();
        return sortedUniqueStatusArray.join(TestSuite.JOIN_CHAR);
    }
    static buildAccordionCard(testResult, testStatusClass) {
        const accordionCard = document.createElement("div");
        accordionCard.classList.add("my-3", "p-3", "bg-white", "rounded", "box-shadow", "card", testStatusClass);
        const cardHeader = TestSuite.buildAccordionCardHeader(testResult.testFilePath, testResult.numPassingTests, testResult.numFailingTests, testResult.numPendingTests, testResult.numTodoTests);
        accordionCard.appendChild(cardHeader);
        const cardBody = TestSuite.buildAccordionCardBody(testResult.testFilePath);
        accordionCard.appendChild(cardBody);
        return accordionCard;
    }
    static buildAccordionCardHeader(testFilePath, passCount, failCount, pendingCount, todoCount) {
        const fileName = TestSuite.sanitizeFilePath(testFilePath);
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        cardHeader.id = `${fileName}_header`;
        const h5 = document.createElement("h5");
        h5.classList.add("border-bottom", "pb-2", "mb-0", "display-5");
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-block");
        btn.setAttribute("data-toggle", "collapse");
        btn.setAttribute("data-target", `#${fileName}_detail`);
        btn.textContent = testFilePath;
        const resultCounts = document.createElement("div");
        const passBadge = document.createElement("span");
        passBadge.classList.add("badge", "badge-success", "border");
        passBadge.textContent = passCount.toString();
        resultCounts.appendChild(passBadge);
        const failBadge = document.createElement("span");
        failBadge.classList.add("badge", "badge-danger", "border");
        failBadge.textContent = failCount.toString();
        resultCounts.appendChild(failBadge);
        const skipBadge = document.createElement("span");
        skipBadge.classList.add("badge", "badge-warning", "border");
        skipBadge.textContent = pendingCount.toString();
        resultCounts.appendChild(skipBadge);
        const todoBadge = document.createElement("span");
        todoBadge.classList.add("badge", "badge-info", "border");
        todoBadge.textContent = todoCount.toString();
        resultCounts.appendChild(todoBadge);
        btn.appendChild(resultCounts);
        h5.appendChild(btn);
        cardHeader.appendChild(h5);
        return cardHeader;
    }
    static buildAccordionCardBody(testFilePath) {
        const fileName = TestSuite.sanitizeFilePath(testFilePath);
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("collapse");
        cardContainer.setAttribute("data-parent", "#accordion");
        cardContainer.id = `${fileName}_detail`;
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardContainer.appendChild(cardBody);
        return cardContainer;
    }
    static sanitizeFilePath(testFilePath) {
        return testFilePath.replace(/(\/)|\\|(:)|(\s)|\.|(@)/g, '_');
    }
}
exports.TestSuite = TestSuite;
TestSuite.JOIN_CHAR = ".";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdFN1aXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlbmRlci9zdWl0ZXMvVGVzdFN1aXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUF5QztBQUN6Qyx3Q0FBcUM7QUFhckMsTUFBYSxTQUFTO0lBaUJYLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBb0I7UUFDckMsTUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUVuQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBUXZDLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBRWhDLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztnQkFDdEQsSUFBSyxVQUFrQixDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtvQkFFOUMsT0FBTyxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO29CQUM5RSxVQUFVLENBQUMsV0FBVyxHQUFJLFVBQWtCLENBQUMsZ0JBQWdCLENBQUM7aUJBQ2pFO2FBQ0o7WUFFRCxJQUFJLGVBQWUsQ0FBQztZQUVwQixNQUFNLGlCQUFpQixHQUF3QixJQUFJLEdBQUcsRUFBa0IsQ0FBQztZQUN6RSxLQUFLLE1BQU0sTUFBTSxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3pDLGVBQWUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzthQUN2RjtZQUVELElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsZUFBZSxHQUFHLHFCQUFTLENBQUMsV0FBVyxDQUFDO2FBQzNDO1lBR0QsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQTtZQU8vRSxNQUFNLE1BQU0sR0FBNkIsSUFBSSxHQUFHLEVBQXVCLENB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