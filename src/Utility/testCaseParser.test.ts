import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

describe("Test Case Parser Tests", () => {

    it("should get the test cases from two sum", async () => {
        const expectedCases = [
            { nums: [2, 7, 11, 15], target: 9, expectedResult: [0, 1] },
            { nums: [3, 2, 4], target: 6, expectedResult: [1, 2] },
            { nums: [3, 3], target: 6, expectedResult: [0, 1] },
        ];

        const cases = await parseForTestCases("twoSum.md");

        expect(cases).toEqual(expectedCases);
    })

    it("should get testcases from dummy", async () => {
        const testCases: any[] = await parseForTestCases("dummyProblem.md");

        const expectedTestCases = [
            { a: [1, 2], b: 3, expectedResult: [4, 5] },
            { a: [6, 7], b: 8, expectedResult: [9, 10] }
        ]

        expect(testCases).toEqual(expectedTestCases);
    })

    it("should get inputs from dummy", async () => {
        const lines = await readLinesAsync("dummyProblem.md");

        const inputs: any[] = [];

        lines.forEach(line => {
            if (containsInput(line)) {
                const inputDetails = getDetails(line);
                const inputDetailArray = splitDetails(inputDetails);

                var inputObject = {};

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
        const lines = await readLinesAsync("dummyProblem.md");
        expect(lines[0]).toEqual("# 99: Dummy Problem")
    })

    it("should detect input in line 3", async () => {
        const lines = await readLinesAsync("dummyProblem.md");
        const hasInput = containsInput(lines[3]);
        expect(hasInput).toBeTruthy();
    })

    it("should get input details from line 3", async () => {
        const lines = await readLinesAsync("dummyProblem.md");
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

async function parseForTestCases(fileName: string): Promise<any[]> {
    const lines: string[] = await readLinesAsync(fileName);
    return getTestCases(lines);
}

function getTestCases(lines: string[]): any[] {
    var testCases: any[] = [];

    lines.forEach(line => {
        if (containsInput(line)) {
            const inputDetails = getDetails(line);
            const inputDetailArray = splitDetails(inputDetails);

            var inputObject = {};

            inputDetailArray.forEach(inputDetail => {
                const singleInputObject = parseDetail(inputDetail);
                inputObject = { ...inputObject, ...singleInputObject };
            })

            testCases.push(inputObject);
        }

        if (containsOutput(line)) {
            const outputString = getDetails(line);
            const outputObject = JSON.parse(outputString);

            const index = testCases.length - 1;
            testCases[index]["expectedResult"] = outputObject;
        }
    })

    return testCases;
}

function parseDetail(line: string): object {
    const splitLines = splitAndTrim("=", line);

    const key = splitLines[0];
    const value = JSON.parse(splitLines[1]);

    const obj: any = {};
    obj[key] = value;

    return obj;
}

function splitDetails(line: string): string[] {
    return smartSplit(",", line)
}

function getDetails(line: string): string {
    const splitLines = splitAndTrim(":", line);
    return splitLines[1];
}

function containsOutput(line: string): boolean {
    return line.includes("Output:");
}

function containsInput(line: string): boolean {
    return line.includes("Input:");
}

function smartSplit(seperator: string, line: string): string[] {

    const output: string[] = []

    var openEndedSquareBracketCount = 0;
    var currentIndex = 0;

    for (var i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === "[") openEndedSquareBracketCount++;
        else if (char === "]") openEndedSquareBracketCount--;

        if (openEndedSquareBracketCount != 0) continue;

        // for the last sub string, no seperator after
        if (char !== seperator && i !== line.length - 1) continue;

        const startPosition = currentIndex;
        const endPosition = i === line.length - 1 ? i + 1 : i;

        const subString = line.substring(startPosition, endPosition).trim();

        output.push(subString);
        currentIndex = i + 1;
    }

    return output;
}

function splitAndTrim(seperator: string, line: string): string[] {
    return line.split(seperator).map(x => x.trim());
}

async function readLinesAsync(fileName: string): Promise<string[]> {

    const filePath = path.join(__dirname, "./", fileName);

    // Reference: https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const stringArray: string[] = []

    for await (const line of rl) {
        stringArray.push(line);
    }

    return stringArray;
}