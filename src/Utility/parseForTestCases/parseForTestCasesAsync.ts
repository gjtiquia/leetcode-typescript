import * as fs from "fs";
import * as readline from "readline";

export async function parseForTestCasesAsync(fileName: string): Promise<any[]> {
    const lines: string[] = await readLinesAsync(fileName);
    return getTestCases(lines);
}

export async function readLinesAsync(filePath: string): Promise<string[]> {

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

export function getTestCases(lines: string[]): any[] {
    let testCases: any[] = [];

    lines.forEach(line => {
        if (containsInput(line)) {
            const inputDetails = getDetails(line);
            const inputDetailArray = splitDetails(inputDetails);

            let inputObject = {};

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

export function parseDetail(line: string): object {
    const splitLines = splitAndTrim("=", line);

    const key = splitLines[0];
    const value = JSON.parse(splitLines[1]);

    const obj: any = {};
    obj[key] = value;

    return obj;
}

export function splitDetails(line: string): string[] {
    return smartSplit(",", line)
}

export function getDetails(line: string): string {
    const splitLines = splitAndTrim(":", line);
    return splitLines[1];
}

export function containsOutput(line: string): boolean {
    return line.includes("Output:");
}

export function containsInput(line: string): boolean {
    return line.includes("Input:");
}

export function smartSplit(seperator: string, line: string): string[] {

    const output: string[] = []

    let openEndedSquareBracketCount = 0;
    let currentIndex = 0;

    for (let i = 0; i < line.length; i++) {
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

export function splitAndTrim(seperator: string, line: string): string[] {
    return line.split(seperator).map(x => x.trim());
}

