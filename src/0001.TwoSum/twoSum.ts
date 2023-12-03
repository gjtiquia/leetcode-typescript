export function twoSum(nums: number[], target: number): number[] {

    for (var i = 0; i < nums.length; i++) {
        const x = nums[i];

        for (var j = i + 1; j < nums.length; j++) {
            const y = nums[j];

            if (x + y === target)
                return [i, j];
        }
    }

    throw new Error("No solution exists!");
};