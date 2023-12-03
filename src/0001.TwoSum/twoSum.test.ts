import { twoSum } from "./twoSum";

describe("Two Sum Tests", () => {

    const cases = [
        [[2, 7, 11, 15], 9, [0, 1]],
        [[3, 2, 4], 6, [1, 2]],
        [[3, 3], 6, [0, 1]],
    ];

    it.each(cases)("nums %p and target %p should give %p", (nums, target, expectedResult) => {
        expect(twoSum(nums as number[], target as number)).toEqual(expectedResult);
    })
})