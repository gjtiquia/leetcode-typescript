import { twoSum } from "./twoSum";
import * as path from "path";
import { parseForTestCasesAsync } from "../Utility";

describe("Two Sum Tests", () => {
    let testCases: any[];

    beforeAll(async () => {
        const fileName = "README.md";
        const filePath = path.join(__dirname, "./", fileName);

        testCases = await parseForTestCasesAsync(filePath);
    })

    it("should pass all test cases", () => {
        expect(testCases.length).toBeGreaterThan(0);

        testCases.forEach(({ nums, target, expectedResult }) => {

            const result = twoSum(nums as number[], target as number);

            expect(result).toEqual(expectedResult);
        })
    })
})