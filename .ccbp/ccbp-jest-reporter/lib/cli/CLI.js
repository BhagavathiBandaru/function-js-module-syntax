"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLI = void 0;
const util_1 = require("util");
const Logger_1 = require("../utils/Logger");
const Constants_1 = require("../processor/Constants");
const IO_1 = require("../utils/IO");
const Processor_1 = require("../processor/Processor");
const yargs = require("yargs");
class CLI {
    static run(argv) {
        const args = yargs
            .usage("$0 <testResults> [resultDir]", "jest-stare CLI", (y) => y
            .positional("testResults", { type: "string" })
            .positional("resultDir", { type: "string" }))
            .options({
            coverageLink: {
                type: "string",
                description: "Link to coverage report for convenient referencing in top left of HTML report"
            }
        })
            .strict()
            .parse(argv);
        const config = {};
        if (util_1.isNullOrUndefined(args.testResults)) {
            Logger_1.Logger.get.error(Constants_1.Constants.NO_CLI_INPUT);
            throw new Error();
        }
        if (!util_1.isNullOrUndefined(args.resultDir)) {
            config.resultDir = args.resultDir;
        }
        if (!util_1.isNullOrUndefined(args.coverageLink)) {
            config.coverageLink = args.coverageLink;
        }
        const results = IO_1.IO.readFileSync(args.testResults);
        Processor_1.Processor.run(JSON.parse(results), config);
    }
}
exports.CLI = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0xJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaS9DTEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQXlDO0FBRXpDLDRDQUF5QztBQUN6QyxzREFBbUQ7QUFDbkQsb0NBQWlDO0FBQ2pDLHNEQUFtRDtBQUNuRCwrQkFBK0I7QUFPL0IsTUFBYSxHQUFHO0lBT0wsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFjO1FBQzVCLE1BQU0sSUFBSSxHQUFHLEtBQUs7YUFDYixLQUFLLENBQUMsOEJBQThCLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUMzRCxDQUFDO2FBQ0ksVUFBVSxDQUFDLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUM3QyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQ25EO2FBQ0EsT0FBTyxDQUFDO1lBQ0wsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCwrRUFBK0U7YUFDdEY7U0FDSixDQUFDO2FBQ0QsTUFBTSxFQUFFO2FBQ1IsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpCLE1BQU0sTUFBTSxHQUFxQixFQUFFLENBQUM7UUFFcEMsSUFBSSx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDckMsZUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6QyxNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsd0JBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQW1CLENBQUM7U0FDL0M7UUFFRCxJQUFJLENBQUMsd0JBQWlCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMzQztRQUVELE1BQU0sT0FBTyxHQUFHLE9BQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQXFCLENBQUMsQ0FBQztRQUM1RCxxQkFBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FDSjtBQTFDRCxrQkEwQ0MifQ==