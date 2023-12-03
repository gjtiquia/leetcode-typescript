import * as path from "path";
import {
    parseForTestCasesAsync,
    readLinesAsync,
    containsInput,
    getDetails,
    splitDetails,
    parseDetail,
} from "./parseForTestCasesAsync";


describe("Test Case Parser Tests", () => {

    it("should get the test cases from two sum", async () => {
        const expectedCases = [
            { nums: [2, 7, 11, 15], target: 9, expectedResult: [0, 1] },
            { nums: [3, 2, 4], target: 6, expectedResult: [1, 2] },
            { nums: [3, 3], target: 6, expectedResult: [0, 1] },
        ];

        const fileName = "twoSum.md";
        const filePath = path.join(__dirname, "./", fileName);
        const testCases: any[] = await parseForTestCasesAsync(filePath);

        expect(testCases).toEqual(expectedCases);
    })

    it("should get testcases from dummy", async () => {
        const fileName = "dummyProblem.md";
        const filePath = path.join(__dirname, "./", fileName);
        const testCases: any[] = await parseForTestCasesAsync(filePath);

        const expectedTestCases = [
            { a: [1, 2], b: 3, expectedResult: [4, 5] },
            { a: [6, 7], b: 8, expectedResult: [9, 10] }
        ]

        expect(testCases).toEqual(expectedTestCases);
    })

    it("should get inputs from dummy", async () => {
        const fileName = "dummyProblem.md";
        const filePath = path.join(__dirname, "./", fileName);
        const lines = await readLinesAsync(filePath);

        const inputs: any[] = [];

        lines.forEach(line => {
            if (containsInput(line)) {
                const inputDetails = getDetails(line);
                const inputDetailArray = splitDetails(inputDetails);

                let inputObject = {};

                inputDetailArray.forEach(inputDetail => {
                    const singleInputObject = parseDetail(inputDetail);
                    inputObject = { ...inputObject, ...singleInputObject };
                })

                inputs.push(inputObject);
            }
        })

        const expectedInputs = [
            { a: [1, 2], b: 3 },
            { a: [6, 7], b: 8 }
        ]

        expect(inputs).toEqual(expectedInputs);
    })


    it("should parse the first line from dummy correctly", async () => {
        const fileName = "dummyProblem.md";
        const filePath = path.join(__dirname, "./", fileName);
        const lines = await readLinesAsync(filePath);

        expect(lines[0]).toEqual("# 99: Dummy Problem")
    })

    it("should detect input in line 3", async () => {
        const fileName = "dummyProblem.md";
        const filePath = path.join(__dirname, "./", fileName);
        const lines = await readLinesAsync(filePath);

        const hasInput = containsInput(lines[3]);
        expect(hasInput).toBeTruthy();
    })

    it("should get input details from line 3", async () => {
        const fileName = "dummyProblem.md";
        const filePath = path.join(__dirname, "./", fileName);
        const lines = await readLinesAsync(filePath);

        const line = lines[3];

        const inputDetails = getDetails(line);

        expect(inputDetails).toEqual("a = [1, 2], b = 3");
    })

    it("should split line3 input details into two", () => {
        const splitLines = splitDetails("a = [1, 2], b = 3");

        expect(splitLines[0]).toEqual("a = [1, 2]");
        expect(splitLines[1]).toEqual("b = 3");
    })

    it("should parse input a into object", () => {
        const obj = parseDetail("a = [1, 2]");
        const targetObj = { a: [1, 2] }

        expect(obj).toEqual(targetObj);
    })

    it("should parse input b into object", () => {
        const obj = parseDetail("b = 3");
        const targetObj = { b: 3 }

        expect(obj).toEqual(targetObj);
    })
})

