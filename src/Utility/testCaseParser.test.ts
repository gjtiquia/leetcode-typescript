import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

describe("Test Case Parser Tests", () => {

    // TODO
    it.skip("should get the test cases from two sum", async () => {
        const expectedCases = [
            { nums: [2, 7, 11, 15], target: 9, expectedResult: [0, 1] },
            { nums: [3, 2, 4], target: 6, expectedResult: [1, 2] },
            { nums: [3, 3], target: 6, expectedResult: [0, 1] },
        ];

        const cases = await parseForTestCases("twoSum.md");

        expect(cases).toEqual(expectedCases);
    })

    it("should parse the first line from dummy correctly", async () => {
        const lines = await readLinesAsync("dummyProblem.md");
        expect(lines[0]).toEqual("# 99: Dummy Problem")
    })
})

async function parseForTestCases(fileName: string): Promise<any[]> {
    const lines: string[] = await readLinesAsync(fileName);

    // TODO

    return []
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