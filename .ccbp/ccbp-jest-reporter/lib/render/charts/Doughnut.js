"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doughnut = void 0;
const chart_js_1 = require("chart.js");
class Doughnut {
    static createChart(canvas, chartData) {
        const doughnut = "doughnut";
        const config = {
            type: doughnut,
            data: {
                labels: chartData.labels,
                datasets: [
                    {
                        backgroundColor: chartData.backgroundColor,
                        data: chartData.data,
                    }
                ]
            }
        };
        Doughnut.buildCanvas(canvas.get(0), config);
    }
    static buildCanvas(canvas, config) {
        const doughnut = new chart_js_1.Chart(canvas, config);
    }
}
exports.Doughnut = Doughnut;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRG91Z2hudXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVuZGVyL2NoYXJ0cy9Eb3VnaG51dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx1Q0FBcUQ7QUFRckQsTUFBYSxRQUFRO0lBV1YsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFpQyxFQUFFLFNBQXFCO1FBRTlFLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUU1QixNQUFNLE1BQU0sR0FBdUI7WUFDL0IsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUU7Z0JBQ0YsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO2dCQUN4QixRQUFRLEVBQUU7b0JBQ047d0JBQ0ksZUFBZSxFQUFFLFNBQVMsQ0FBQyxlQUFlO3dCQUMxQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7cUJBQ3ZCO2lCQUNKO2FBQ0o7U0FDSixDQUFDO1FBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFTTSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQXlCLEVBQUUsTUFBMEI7UUFDM0UsTUFBTSxRQUFRLEdBQUcsSUFBSSxnQkFBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0NBRUo7QUExQ0QsNEJBMENDIn0=