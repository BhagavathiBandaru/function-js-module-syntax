"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const util_1 = require("util");
class Switch {
    constructor(checkBox, divClass, divClassName, addtnlCheckBoxArray, addtnlClassNameArray) {
        this.activateFilters(checkBox, divClass, divClassName, addtnlCheckBoxArray, addtnlClassNameArray);
    }
    static mixStatus(currentStatus, oldStatus) {
        const statusArray = oldStatus.split(Switch.JOIN_CHAR);
        statusArray.push(currentStatus);
        const sortedUniqueStatusArray = [...new Set(statusArray)].sort();
        return sortedUniqueStatusArray.join(Switch.JOIN_CHAR);
    }
    activateFilters(checkBox, divClass, divClassName, addtnlCheckBoxArray, addtnlClassNameArray) {
        checkBox.change(() => {
            if (checkBox.is(":checked")) {
                divClass.show();
                if (!util_1.isNullOrUndefined(addtnlCheckBoxArray)) {
                    addtnlCheckBoxArray.forEach((addtnlCheckBox, index) => {
                        const mixedDualClass = Switch.mixStatus(addtnlClassNameArray[index], divClassName);
                        const mixedClassDiv = $("." + mixedDualClass);
                        mixedClassDiv.show();
                    });
                    const mixedClass = Switch.mixStatus(addtnlClassNameArray[0], divClassName);
                    const allMixedClass = Switch.mixStatus(addtnlClassNameArray[1], mixedClass);
                    const allMixedClassDiv = $("." + allMixedClass);
                    allMixedClassDiv.show();
                }
            }
            else {
                divClass.hide();
                if (!util_1.isNullOrUndefined(addtnlCheckBoxArray)) {
                    let allUnchecked = true;
                    addtnlCheckBoxArray.forEach((addtnlCheckBox, index) => {
                        if (!addtnlCheckBox.is(":checked")) {
                            const mixedClass = Switch.mixStatus(addtnlClassNameArray[index], divClassName);
                            const mixedClassDiv = $("." + mixedClass);
                            mixedClassDiv.hide();
                        }
                        else {
                            allUnchecked = false;
                        }
                    });
                    if (allUnchecked) {
                        const mixedClass = Switch.mixStatus(addtnlClassNameArray[0], divClassName);
                        const allMixedClass = Switch.mixStatus(addtnlClassNameArray[1], mixedClass);
                        const allMixedClassDiv = $("." + allMixedClass);
                        allMixedClassDiv.hide();
                    }
                }
            }
        });
    }
}
exports.Switch = Switch;
Switch.JOIN_CHAR = "\\.";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlbmRlci9uYXZpZ2F0aW9uL1N3aXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBeUM7QUFPekMsTUFBYSxNQUFNO0lBaUNmLFlBQ0ksUUFBa0MsRUFBRSxRQUFnQyxFQUFFLFlBQXFCLEVBQzNGLG1CQUFnRCxFQUFFLG9CQUErQjtRQUM3RSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLG9CQUFvQixDQUFDLENBQUM7SUFDMUcsQ0FBQztJQXBCTyxNQUFNLENBQUMsU0FBUyxDQUFDLGFBQXFCLEVBQUUsU0FBaUI7UUFDN0QsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEQsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoQyxNQUFNLHVCQUF1QixHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pFLE9BQU8sdUJBQXVCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBMkJPLGVBQWUsQ0FDbkIsUUFBa0MsRUFBRSxRQUFnQyxFQUFFLFlBQXFCLEVBQzNGLG1CQUFnRCxFQUFFLG9CQUErQjtRQUM3RSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNqQixJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3pCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLHdCQUFpQixDQUFDLG1CQUFtQixDQUFDLEVBQUU7b0JBQ3pDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsRUFBRTt3QkFDbEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDbkYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQTJCLENBQUM7d0JBQ3hFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDekIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztvQkFDM0UsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQztvQkFDNUUsTUFBTSxnQkFBZ0IsR0FBSSxDQUFDLENBQUMsR0FBRyxHQUFHLGFBQWEsQ0FBMkIsQ0FBQztvQkFDM0UsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzNCO2FBQ0o7aUJBQU07Z0JBQ0gsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixJQUFJLENBQUMsd0JBQWlCLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFDekMsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUN4QixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUU7d0JBQ2xELElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUNoQyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDOzRCQUMvRSxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBMkIsQ0FBQzs0QkFDcEUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO3lCQUN4Qjs2QkFBTTs0QkFDSCxZQUFZLEdBQUcsS0FBSyxDQUFDO3lCQUN4QjtvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLFlBQVksRUFBRTt3QkFDZCxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUMzRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO3dCQUM1RSxNQUFNLGdCQUFnQixHQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUEyQixDQUFDO3dCQUMzRSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDM0I7aUJBQ0o7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7QUExRkwsd0JBMkZDO0FBcEYwQixnQkFBUyxHQUFHLEtBQUssQ0FBQyJ9