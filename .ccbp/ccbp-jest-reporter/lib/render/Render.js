"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Render = void 0;
const $ = require("jquery");
const Constants_1 = require("./Constants");
const Status_1 = require("./charts/Status");
const util_1 = require("util");
class Render {
    static init() {
        document.addEventListener("DOMContentLoaded", () => {
            const results = JSON.parse($("#test-results").text());
            Render.show(results);
        });
    }
    static escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
    static show(results) {
        document.body.style.backgroundColor = " rgb(250, 251, 254)";
        const totalResultSummary = document.getElementById('test-results');
        totalResultSummary.classList.add("test-results-container");
        totalResultSummary.innerText = '';
        const resultsTitle = `<div style="color:rgb(0, 48, 110);" class="flex justify-center items-center mt-4 text-3xl font-semibold">
                                    <span class="p-3"><label>Total:</label>${results.numTotalTests}</span>
                                    <span class="p-3"><i class='fas fa-check-circle text-green-700 m-1'></i>${results.numPassedTests}</span>
                                    <span class="p-3"><i class='fas fa-times-circle text-red-600  m-1'></i>${results.numFailedTests}</span>
                                </div>`;
        totalResultSummary.insertAdjacentHTML("beforeend", resultsTitle);
        results.testResults.map(eachTestSuite => {
            const testsSummary = `
                            <div x-data="{ isAccordionOpen: false }" style="display: flex; flex-direction: column; width: 80%; padding: 25px 0px; border: solid 1px rgb(226,232,240); margin: auto; background-color: white; font-family: roboto; border-radius:8px; margin-top:30px;">
                                <div class="px-8" style="color: rgb(82, 96, 109);">
                                    <div class="flex justify-between">
                                        <label class='text-3xl px-4' style="color:rgb(0, 48, 110);">${eachTestSuite.testResults[0].ancestorTitles.join(" ")}</label>
                                        <div class="pt-4">
                                            <button style="outline:none;" x-on:click="isAccordionOpen = !isAccordionOpen" x-show="!isAccordionOpen"><i class="fas fa-chevron-down text-3xl"></i></button>
                                            <button style="outline:none;" x-on:click="isAccordionOpen = !isAccordionOpen" x-show="isAccordionOpen" ><i class="fas fa-chevron-up text-3xl"></i></button>
                                        </div>
                                    </div>
                                    <div class='flex mx-4'>
                                        <div class="flex items-center m-2 mr-4"><i class="far fa-square m-1"></i>${eachTestSuite.numPassingTests + eachTestSuite.numFailingTests}</div>
                                        <div class="flex items-center m-2 mr-4"><i class='fas fa-check-circle text-green-700 m-1'></i> ${eachTestSuite.numPassingTests}</div>
                                        <div class="flex items-center m-2 mr-4"><i class='fas fa-times-circle text-red-600  m-1'></i> ${eachTestSuite.numFailingTests}</div>
                                    </div>
                                </div>
                                ${eachTestSuite.testResults.map(eachTest => {
                const testResultData = `<div x-show="isAccordionOpen" class="flex flex-col border-r-0 border-l-0 border-b-0 border-t	 border-solid border-gray-300 py-0	px-12 " >
                                                                <div style="color:rgb(33 77 163);" class="flex justify-between flex-row py-3"  >
                                                                    <div  class="flex justify-start items-baseline w-9/12">${eachTest.status === 'passed' ? "<i class='fas fa-check-circle text-green-700 px-2'></i>" : "<i class='fas fa-times-circle text-red-600  px-2'></i>"} <span> ${eachTest.title} </span></div>
                                                                    <div >${eachTest.duration} ms  ${"<i class='far fa-clock pl-2' ></i>"}</div>
                                                                </div>
                                                            </div>`;
                return testResultData;
            }).join("")}
                            </div>`;
            totalResultSummary.insertAdjacentHTML("beforeend", testsSummary);
        });
    }
    static updateStatusArea(results) {
        Status_1.Status.setResultsClass($("#test-suites-results"), results.numPassedTestSuites, results.numTotalTestSuites - results.numPassedTestSuites - results.numPendingTestSuites);
        Status_1.Status.setResultsClass($("#tests-results"), results.numPassedTests, results.numTotalTests - results.numPassedTests - results.numPendingTests);
        Status_1.Status.setResultsClass($("#snapshots-results"), results.snapshot.matched, results.snapshot.unmatched);
        if (results.snapshot.added === 0 &&
            results.snapshot.matched === 0 &&
            results.snapshot.unchecked === 0 &&
            results.snapshot.unmatched === 0 &&
            results.snapshot.updated === 0) {
            $("#snapshots-group").hide();
        }
    }
    static setReportTitle(config) {
        const tabTitle = !util_1.isNullOrUndefined(config.reportTitle) ? config.reportTitle : "jest-stare!";
        document.title = tabTitle;
    }
    static setReportHeadline(config) {
        const brandTitle = !util_1.isNullOrUndefined(config.reportHeadline) ? config.reportHeadline : "jest-stare";
        const a = $("#navbar-title");
        a.text(brandTitle);
    }
    static setCoverageLink(config) {
        if (!util_1.isNullOrUndefined(config.coverageLink)) {
            const a = $("#coverage-link");
            a.addClass("active");
            a.removeClass("disabled");
            a.attr("href", config.coverageLink);
        }
    }
    static buildChartsData(passedTests, failedTests, pendingTests, todoTests) {
        const chartData = {
            labels: [],
            backgroundColor: [],
            data: [],
        };
        if (passedTests > 0) {
            chartData.labels.push(Constants_1.Constants.PASSED_LABEL);
            chartData.backgroundColor.push(Constants_1.Constants.PASS);
            chartData.data.push(passedTests);
        }
        if (failedTests > 0) {
            chartData.labels.push(Constants_1.Constants.FAILED_LABEL);
            chartData.backgroundColor.push(Constants_1.Constants.FAIL);
            chartData.data.push(failedTests);
        }
        if (pendingTests > 0) {
            chartData.labels.push(Constants_1.Constants.PENDING_LABEL);
            chartData.backgroundColor.push(Constants_1.Constants.PENDING);
            chartData.data.push(pendingTests);
        }
        if (todoTests > 0) {
            chartData.labels.push(Constants_1.Constants.TODO_LABEL);
            chartData.backgroundColor.push(Constants_1.Constants.TODO);
            chartData.data.push(todoTests);
        }
        return chartData;
    }
    static addSnapshotChartData(results, snapshotChart) {
        if (results.snapshot.filesAdded > 0) {
            snapshotChart.labels.push(Constants_1.Constants.ADDED_LABEL);
            snapshotChart.backgroundColor.push(Constants_1.Constants.ADDED);
            snapshotChart.data.push(results.snapshot.filesAdded);
        }
        if (results.snapshot.unchecked > 0) {
            if (results.snapshot.didUpdate) {
                snapshotChart.labels.push(Constants_1.Constants.UPDATED_SNAPSHOT_TEST_LABEL);
                snapshotChart.backgroundColor.push(Constants_1.Constants.UPDATED_SNAPSHOT_TEST);
                snapshotChart.data.push(results.snapshot.unchecked);
            }
            else {
                snapshotChart.labels.push(Constants_1.Constants.OBSOLETE_SNAPSHOT_TEST_LABEL);
                snapshotChart.backgroundColor.push(Constants_1.Constants.OBSOLETE_SNAPSHOT_TEST);
                snapshotChart.data.push(results.snapshot.unchecked);
            }
        }
        if (results.snapshot.updated > 0) {
            snapshotChart.labels.push(Constants_1.Constants.CHANGED_LABEL);
            snapshotChart.backgroundColor.push(Constants_1.Constants.CHANGED);
            snapshotChart.data.push(results.snapshot.updated);
        }
        if (results.snapshot.filesRemoved > 0) {
            if (results.snapshot.didUpdate) {
                snapshotChart.labels.push(Constants_1.Constants.REMOVED_OBSOLETE_SNAPSHOT_FILE_LABEL);
                snapshotChart.backgroundColor.push(Constants_1.Constants.REMOVED_OBSOLETE_SNAPSHOT_FILE);
                snapshotChart.data.push(results.snapshot.filesRemoved);
            }
            else {
                snapshotChart.labels.push(Constants_1.Constants.OBSOLETE_SNAPSHOT_FILE_LABEL);
                snapshotChart.backgroundColor.push(Constants_1.Constants.OBSOLETE_SNAPSHOT_FILE);
                snapshotChart.data.push(results.snapshot.filesRemoved);
            }
        }
        return snapshotChart;
    }
}
exports.Render = Render;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVuZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlbmRlci9SZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTZCO0FBRTdCLDJDQUF3QztBQUN4Qyw0Q0FBeUM7QUFNekMsK0JBQXlDO0FBY3pDLE1BQWEsTUFBTTtJQVFSLE1BQU0sQ0FBQyxJQUFJO1FBQ2QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtZQUMvQyxNQUFNLE9BQU8sR0FBc0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQVVPLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBVztRQUNuQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQVVRLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBb0I7UUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHFCQUFxQixDQUFDO1FBQzVELE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNsRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDMUQsa0JBQWtCLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtRQUNqQyxNQUFNLFlBQVksR0FBRzs2RUFDZ0QsT0FBTyxDQUFDLGFBQWE7OEdBQ1ksT0FBTyxDQUFDLGNBQWM7NkdBQ3ZCLE9BQU8sQ0FBQyxjQUFjO3VDQUM1RixDQUFBO1FBQy9CLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRyxZQUFZLENBQUUsQ0FB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