//1. 合并两个有序数组
// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
// 方法一： 直接合并之后再排序
const merge1 = (nums1, m, nums2, n) => {
    for(let i = 0; i < n; i++){
        nums1[m + i] = nums2[i];
    }
    nums1.sort((a, b) => a - b);
    return nums1;
}

//方法二：双指针
// 将两个数组看作队列，每次从两个数组头部取出比较小的数字放到结果中
const merge2 = (nums1, m, nums2, n) => {
    let p1 = 0, p2 = 0;
    let sorted = new Array(m + n).fill(0);
    let cur;
    while(p1 < m || p2 < n){
        if(p1 === m){
            cur = nums2[p2++];
        }else if(p2 === n){
            cur = nums1[p1++];
        }else if(nums1[p1] < nums2[p2]){
            cur = nums1[p1++];
        }else{
            cur = nums2[p2++];
        }
        sorted[p1 + p2 - 1] = cur;
    }
    for(let i = 0; i < m + n; i++){
        nums1[i] = sorted[i];
    }
    return nums1;
}


//逆向双指针
// 可以指针设置为从后向前遍历，每次取两者之中的较大者放进 nums1 的最后面
const merge3 = (nums1, m, nums2, n) => {
    let p1 = m - 1, p2 = n - 1;
    let tail = m + n - 1;
    let cur;
    while(p1 >=0 || p2 >= 0){
        if(p1 === -1){
            cur = nums2[p2--];
        }else if(p2 === -1){
            cur = nums1[p1--];
        }else if(nums1[p1] > nums2[p2]){
            cur = nums1[p1--];
        }else{
            cur = nums2[p2--];
        }
        nums1[tail--] = cur;
    }
    return nums1;
}

// const nums1 = [1,2,3,0,0,0], m = 3, nums2 =  [2,5,6], n = 3;
// const nums1 = [1], m = 1, nums2 = [], n = 0;
// console.log('merge', merge3(nums1, m, nums2, n));

//2. 盛最多水的容器(leetcode 11)
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
// 说明：你不能倾斜容器。
// 双指针法
const maxArea = function(height) {
    let l = 0, r = height.length - 1;
    let ans = 0;
    while(l < r){
        const area = Math.min(height[l], height[r]) * (r - l);
        ans = Math.max(ans, area);
        if(height[l] <= height[r]){
            l++;
        }else{
            r--;
        }
    }
    return ans;
}

// const height = [1,9,6,2,5,4,8,9,7];
// const height = [1,1];
// console.log('maxArea:', maxArea(height));


//3. 下一个排列(leecode 31)
/**
 * 整数数组的一个 排列  就是将其所有成员以序列或线性顺序排列。
 * - 例如，arr = [1,2,3] ，以下这些都可以视作 arr 的排列：[1,2,3]、[1,3,2]、[3,1,2]、[2,3,1] 。
 * 整数数组的 下一个排列 是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列根据其字典顺序从小到大排列在一个容器中，
 * 那么数组的 下一个排列 就是在这个有序容器中排在它后面的那个排列。如果不存在下一个更大的排列，
 * 那么这个数组必须重排为字典序最小的排列（即，其元素按升序排列）。
 * 给你一个整数数组 nums ，找出 nums 的下一个排列。必须 原地 修改，只允许使用额外常数空间。
*/
/**
 * 思路：
 * a. 首先从后向前查找第一个顺序对 (i,i+1)，满足 a[i] < a[i+1]。这样「较小数」即为 a[i]。此时 [i+1,n) 必然是下降序列。
 * b. 如果找到了顺序对，那么在区间 [i+1,n) 中从后向前查找第一个元素 j 满足 a[i] < a[j]。这样「较大数」即为 a[j]。
 * c. 交换 a[i] 与 a[j]，此时可以证明区间 [i+1,n) 必为降序。我们可以直接使用双指针反转区间 [i+1,n) 使其变为升序，而无需对该区间进行排序。
*/
const nextPermutation = function(nums){
    let i = nums.length - 2;
    while(i >= 0 && nums[i] >= nums[i + 1]){
        i--;
    }
    if(i >= 0){
        let j = nums.length - 1;
        while(j >= 0 && nums[i] >= nums[j]){
            j--;
        }
        swap(nums, i, j);
    }
    reverse(nums, i + 1);
    return nums;
}

function swap(nums, i, j){
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

function reverse(nums, start){
    let left = start, right = nums.length - 1;
    while(left < right){
        swap(nums, left, right);
        left++;
        right--;
    }
}

// const nums = [1,2,3];
// const nums = [3,2,1];
// const nums = [1,1,5];
// console.log('nextPermutation:', nextPermutation(nums));


//4. 合并区间(leetcode 56)
// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，
// 并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
/**
 * 示例:
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
 * 输出：[[1,6],[8,10],[15,18]]
 * 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
*/
/**
 * 思路：
 * 如果我们按照区间的左端点排序，那么在排完序的列表中，可以合并的区间一定是连续的。
 * 首先，我们将列表中的区间按照左端点升序排序。然后我们将第一个区间加入 merged 数组中，并按顺序依次考虑之后的每个区间：
 * - 如果当前区间的左端点在数组 merged 中最后一个区间的右端点之后，那么它们不会重合，我们可以直接将这个区间加入数组 merged 的末尾；
 * - 否则，它们重合，我们需要用当前区间的右端点更新数组 merged 中最后一个区间的右端点，将其置为二者的较大值。
*/
const merge = (intervals) => {
    if(intervals.length === 0){
        return [[]];
    }
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    for(let i = 0; i < intervals.length; i++){
        let L = intervals[i][0], R = intervals[i][1];
        if(merged.length === 0 || merged[merged.length - 1][1] < L){
            merged.push([L,R]);
        }else{
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
        }
    }
    return merged;
}

// const intervals = [[1,3],[2,6],[8,10],[15,18]];
// const intervals = [[1,4],[4,5]];
// const intervals = [[1,3]];
// const intervals = [[1,4],[5,6]];
// console.log('merge:', merge(intervals));

//5. 插入区间(leetcode 57)
// 给你一个 无重叠的 ，按照区间起始端点排序的区间列表。
// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
/** 
 * 示例:
 * 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出：[[1,5],[6,9]]
*/
const insert = (intervals, newInterval) => {
    if(intervals.length === 0) return [newInterval];
    intervals.push(newInterval);
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];
    for(let i = 0; i < intervals.length; i++){
        let L = intervals[i][0], R = intervals[i][1];
        if(merged.length === 0 || merged[merged.length - 1][1] < L){
            merged.push([L,R]);
        }else{
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
        }
    }
    return merged;
}

// const intervals = [[1,3],[6,9]], newInterval = [2,5];
// const intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8];
// const intervals = [[1,5]], newInterval = [2,3];
// const intervals = [], newInterval = [5,7];
// const intervals = [[1,5]], newInterval = [2,7];
// console.log('insert:', insert(intervals, newInterval));


//6. 螺旋矩阵 II(leetcode 59)
// 给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
const generateMatrix = (n) => {
    const maxNum = n * n;
    let curNum = 1;
    const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let row = 0, column = 0;
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; //右下左上
    let directionIndex = 0;
    while(curNum <= maxNum){
        matrix[row][column] = curNum++;
        const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
        if(nextRow < 0 || nextRow >= n || nextColumn < 0 || nextColumn >= n || matrix[nextRow][nextColumn] !== 0){
            directionIndex = (directionIndex + 1) % 4;   //顺时针旋转至下一个方向
        }
        row = row + directions[directionIndex][0];
        column = column + directions[directionIndex][1];
    }
    return matrix;
}

// console.log('generateMatrix:', generateMatrix(5));

//7. 最长连续序列(leetcode 128)
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
const longestConsecutive = function(nums){
   const num_set = new Set();
   for(const num of nums){
       num_set.add(num);
   }

   let longestStreak = 0;
   for(const num of num_set){
       if(!num_set.has(num - 1)){
           let currentNum = num;
           let currentStreak = 1;

           while(num_set.has(currentNum + 1)){
               currentNum++;
               currentStreak++;
           }
           longestStreak = Math.max(longestStreak, currentStreak);
       }
   }
   return longestStreak;
}

// const nums = [100,4,200,1,3,2];
// const nums = [0,3,7,2,5,8,4,6,0,1];
// console.log('longestConsecutive:', longestConsecutive(nums));

//8. 加一(leetcode 66)
// 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
// 你可以假设除了整数 0 之外，这个整数不会以零开头。
/**
 * 思路：
 * 对数组 digits 进行一次逆序遍历，找出第一个不为 9 的元素，将其加一并将后续所有元素置零即可。
 * 如果 digits 中所有的元素均为 9，只需要构造一个长度比 digits 多 1 的新数组，将首元素置为 1，其余元素置为 0 即可。
*/
const plusOne = (digits) => {
    const n = digits.length;
    for(let i = n - 1; i >= 0; i--){
        if(digits[i] == 9){
            digits[i] = 0;
        }else{
            digits[i] += 1;
            return digits;
        }
    }
    const ans = new Array(n + 1).fill(0);
    ans[0] = 1;
    return ans;
}

// const digits = [1,2,3];
// const digits = [4,3,2,1];
// const digits = [9,9];
// console.log('plusOne:', plusOne(digits));


//9. 组合总和(leetcode 39)
/**
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，
 * 并以列表形式返回。你可以按 任意顺序 返回这些组合。
 * candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
*/
/**
 * 思路: 对于这类寻找所有可行解的题，我们都可以尝试用「搜索回溯」的方法来解决。
 * 我们定义递归函数 dfs(target,combine,idx) 表示当前在 candidates 数组的第 idx 位，还剩 target 要组合，已经组合的列表为 combine。
 * 递归的终止条件为 target≤0 或者 candidates 数组被全部用完。那么在当前的函数中，每次我们可以选择跳过不用第 idx 个数，
 * 即执行 dfs(target,combine,idx+1)。也可以选择使用第 idx 个数，即执行 dfs(target−candidates[idx],combine,idx)，
 * 注意到每个数字可以被无限制重复选取，因此搜索的下标仍为 idx。
*/
const combinationSum = function(candidates, target){
    const ans = [];
    const dfs = (target, combine, idx) => {
        if(idx === candidates.length){
            return;
        }
        if(target === 0){
            ans.push(combine);
            return;
        }
        //直接跳过
        dfs(target, combine, idx + 1);
        //选择当前数
        if(target - candidates[idx] >= 0){
            dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
        }
    }

    dfs(target, [], 0);
    return ans;
}

// const candidates = [2,3,6,7], target = 7;
// const candidates = [2,3,5], target = 8;
// const candidates = [2], target = 1;
// console.log('combinationSum:', combinationSum(candidates, target));

//10. 颜色分类(leetcode 75)
/**
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。必须在不使用库的sort函数的情况下解决这个问题。
*/
//方法一：转换成对象
const sortColors1 = function(nums){
    const map = {};
    for(let i = 0; i < nums.length; i++){
        if(!map[nums[i]]){
            map[nums[i]] = 1;
        }else{
            map[nums[i]] += 1;
        }
    }
    const ans = [];
    for(let i = 0; i <= 2; i++){
        let num = 1;
        while(num <= map[i]){
            ans.push(i);
            num++;
        }
    }
    return ans;
}

//方法二：双指针
const sortColors2 = function(nums){
    let len = nums.length;
    let p0 = 0, p2 = len - 1;
    for(let i = 0; i <= p2; i++){
        while(i <= p2 && nums[i] == 2){
            let temp = nums[i];
            nums[i] = nums[p2];
            nums[p2] = temp;
            --p2;
        }
        if(nums[i] == 0){
            let temp = nums[i];
            nums[i] = nums[p0];
            nums[p0] = temp;
            ++p0;
        }
    }
}

// const nums = [2,0,2,1,1,0];
// const nums = [2,0,1];
// console.log('sortColors:', sortColors2(nums));
// sortColors2(nums);
// console.log('nums:', nums);


//11. 跳跃游戏 II(leetcode 45)
/**
 * 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置。假设你总是可以到达数组的最后一个位置。
*/
//方法一：反向查找出发位置
const jump1 = (nums) => {
    let position = nums.length - 1;
    let steps = 0;
    while(position > 0){
        for(let i = 0; i < position; i++){
            if(i + nums[i] >= position){
                position = i;
                steps++;
                break;
            }
        }
    }
    return steps;
}

// 方法二：正向查找可到达的最大位置
const jump2 = (nums) => {
    let len = nums.length;
    let end = 0;
    let maxPosition = 0;
    let steps = 0;
    for(let i = 0; i < len - 1; i++){
        maxPosition = Math.max(maxPosition, i + nums[i]);
        if(i === end){
            end = maxPosition;
            steps++;
        }
    }
    return steps;
}

// const nums = [2,3,1,1,4];
// console.log('jump:', jump1(nums));


//12. 只出现一次的数字(leetcode 136)
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
// 说明：你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
/**
 * 常用的解法：
 * a. 使用集合存储数字。遍历数组中的每个数字，如果集合中没有该数字，则将该数字加入集合，如果集合中已经有该数字，则将该数字从集合中删除，
 *    最后剩下的数字就是只出现一次的数字。
 * b. 使用哈希表存储每个数字和该数字出现的次数。遍历数组即可得到每个数字出现的次数，并更新哈希表，最后遍历哈希表，得到只出现一次的数字。
 * c. 使用集合存储数组中出现的所有数字，并计算数组中的元素之和。由于集合保证元素无重复，因此计算集合中的所有元素之和的两倍，即为每个元素出现
 *    两次的情况下的元素之和。由于数组中只有一个元素出现一次，其余元素都出现两次，因此用集合中的元素之和的两倍减去数组中的元素之和，
 *    剩下的数就是数组中只出现一次的数字。
 * 上述三种解法都需要额外使用 O(n)O(n) 的空间，其中 nn 是数组长度。
*/
/**
 * 对于这道题，可使用异或运算 ⊕。异或运算有以下三个性质。
 * - 任何数和 0 做异或运算，结果仍然是原来的数，即 a⊕0=a。
 * - 任何数和其自身做异或运算，结果是 0，即 a⊕a=0。
 * - 异或运算满足交换律和结合律，即 a⊕b⊕a=b⊕a⊕a=b⊕(a⊕a)=b⊕0=b。

*/
const singleNumber = (nums) => {
    let single = 0;
    for(let num of nums){
        single ^= num;
    }
    return single;
}
// const nums = [2,2,1];
// const nums = [4,1,2,1,2];
// console.log('singleNumber:', singleNumber(nums));


//13. 多数元素(leetcode 169)
// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
const majorityElement = (nums) => {
    let len = nums.length;
    let map = {};
    for(let num of nums){
        if(!map[num]){
            map[num] = 1;
        }else{
            map[num] += 1;
        }
    }

    for(let key in map){
        if(map[key] > len / 2){
            return Number(key);
        }
    }
}
// const nums = [3,2,3];
// const nums = [2,2,1,1,1,2,2];
// console.log('majorityElement:', majorityElement(nums));


//14. 买卖股票的最佳时机(leetcode 121)
/**
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
*/
/**
 * 示例：
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 * 注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
*/
const maxProfit = (prices) => {
    let minPrice = Number.MAX_VALUE;
    let maxPrice = 0;
    for(let i = 0; i < prices.length; i++){
        if(prices[i] < minPrice){
            minPrice = prices[i];
        }else if(prices[i] - minPrice > maxPrice){
            maxPrice = prices[i] - minPrice;
        }
    }
    return maxPrice;
}
// const prices = [7,1,5,3,6,4];
// const prices = [7,6,4,3,1];
// const prices = [2,4,1];
// console.log('maxProfit:', maxProfit(prices));


//15. 杨辉三角(leetcode 118)
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。
const generate = (numRows) => {
    const ret = [];
    for(let i = 0; i < numRows; i++){
        const row = new Array(i + 1).fill(1);
        for(let j = 1; j < row.length - 1; j++){
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret;
}
// console.log('generate:', generate(1));


//16. 杨辉三角 II(leetcode 119)
// 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。
const getRow = (rowIndex) => {
    const ret = [];
    for(let i = 0; i <= rowIndex; i++){
        const row = new Array(i + 1).fill(1);
        for(let j = 1; j < row.length - 1; j++){
            row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
        }
        ret.push(row);
    }
    return ret[rowIndex];
}
// console.log('getRow:', getRow(0));


//17. 买卖股票的最佳时机 II(leetcode 122)
/**
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 返回 你能获得的 最大 利润 。
*/
//方法一：贪心算法
const maxProfit2 = (prices) => {
    let ans = 0;
    for(let i = 1; i < prices.length; i++) {
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;
}

//方法二：动态规划
const maxProfit3 = (prices) => {
    let dp0 = 0, dp1 = -prices[0];
    for(let i = 1; i < prices.length; i++) {
        let newDp0 = Math.max(dp0, dp1 + prices[i]);
        let newDp1 = Math.max(dp1, dp0 - prices[i]);
        dp0 = newDp0;
        dp1 = newDp1;
    }
    return dp0;
}

// const prices = [7,1,5,3,6,4];
// const prices = [1,2,3,4,5];
// const prices = [7,6,4,3,1];
// console.log('maxProfit2:', maxProfit3(prices));


//18. 子集(leetcode 78)
// 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
const subsets = (nums) => {
    const t = [];
    const ans = [];
    const n = nums.length;
    const dfs = (cur) => {
        if(cur === nums.length){
            ans.push(t.slice());
            return;
        }
        t.push(nums[cur]);
        dfs(cur + 1, nums);
        t.pop(t.length - 1);
        dfs(cur + 1, nums);
    }
    dfs(0, nums);
    return ans;
}

// const nums = [1, 2, 3];
// const nums = [0];
// console.log('subsets:', subsets(nums));


//19. 被围绕的区域(leetcode 130)
// 给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
/**
 * 示例：
 * 输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
 * 输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
 * 解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
*/
//方法一：深度优先搜索
const solve = (board) => {
    const n = board.length;
    if(n === 0) return;
    const m = board[0].length;

    const dfs = (board, x, y) => {
        if(x < 0 || x >= n || y < 0 || y >= m || board[x][y] !== 'O'){
            return;
        }
        board[x][y] = 'A';
        dfs(board, x - 1, y);
        dfs(board, x + 1, y);
        dfs(board, x, y - 1);
        dfs(board, x, y + 1);
    }

    for(let i = 0; i < n; i++){
        dfs(board, i, 0);
        dfs(board, i, m - 1);
    }
    for(let j = 1; j < m - 1; j++){
        dfs(board, 0, j);
        dfs(board, n - 1, j);
    }

    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(board[i][j] === 'A'){
                board[i][j] = 'O';
            }else if(board[i][j] === 'O'){
                board[i][j] = 'X';
            }
        }
    }
    return board;
}

// const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
// const board = [["X"]];
// console.log('solve:', solve(board));


//20. 只出现一次的数字 II(leetcode 137)
// 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
const singleNumber1 = (nums) => {
    const freq = new Map();
    for(const num of nums){
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    let ans = 0;
    console.log('freq.entries():', freq.entries());
    for(const [num, occ] of freq.entries()){
        if(occ === 1){
            ans = num;
            break;
        }
    }
    return ans;
}
// const nums = [2,2,3,2];
// const nums = [0,1,0,1,0,1,99];
// console.log('singleNumber1:', singleNumber1(nums));


//21.存在重复元素(leetcode 217)
// 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
const containsDuplicate = (nums) => {
    const set = new Set();
    for(const num of nums){
        if(set.has(num)){
            return true;
        }
        set.add(num);
    }
    return false;
}
// const nums = [1,2,3,1];
// const nums = [1,2,3,4];
// const nums = [1,1,1,3,3,4,3,2,4,2];
// console.log('containsDuplicate:', containsDuplicate(nums));


//22. 丢失的数字(leetcode 268)
// 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。
/**
 * 示例：
 * 输入：nums = [3,0,1]
 * 输出：2
 * 解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
*/
//方法一：求和
const missingNumber1 = (nums) => {
    const n = nums.length;
    let sum = 0;
    for(let i = 0; i <= n; i++){
        sum += i;
    }
    const amount = nums.reduce((occ, num) => occ + num, 0);
    return sum - amount;
}

//方法二：排序
const missingNumber2 = (nums) => {
    nums.sort((a, b) => a - b);
    let n = nums.length;
    for(let i = 0; i <= n; i++){
        if(nums[i] !== i){
            return i;
        }
    }
    return n;
}

// const nums = [3,0,1];
// const nums = [0,1];
// const nums = [9,6 ,4,2,3,5,7,0,1];
// const nums = [0];
// console.log('missingNumber:', missingNumber2(nums));

//23. 两数之和(leetcode 1)
// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案。
const twoSum = (nums, target) => {
    let map = new Map();
    const n = nums.length;
    for(let i = 0; i < n; i++){
        if(map.has(target - nums[i])){
            return [map.get(target - nums[i]), i];
        }
        map.set(nums[i], i);
    }
    return [];
}
// const nums = [2,7,11,15], target = 9;
// const nums = [3,2,4], target = 6;
// const nums = [3,3], target = 6;
// console.log('twoSum:', twoSum(nums, target));


//24. 三数之和(leetcode 15)
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。
//方法一：排序加双指针
const threeSum = (nums) => {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    const ans = [];
    for(let first = 0; first < n; first++){
        // 需要和上一次枚举的数不相同
        if(first > 0 && nums[first] === nums[first - 1]){
            continue;
        }
        // c 对应的指针初始指向数组的最右端
        let third = n - 1;
        const target = -nums[first];
        for(let second = first + 1; second < n; second++){
            // 需要和上一次枚举的数不相同
            if(second > first + 1 && nums[second] === nums[second - 1]){
                continue;
            }
            // 需要保证 b 的指针在 c 的指针的左侧
            while(second < third && nums[second] + nums[third] > target){
                --third;
            }
            // 如果指针重合，随着 b 后续的增加
            // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
            if(second === third){
                break;
            }
            if(nums[second] + nums[third] === target){
                ans.push([nums[first], nums[second], nums[third]]);
            }
        }
    }
    return ans;
}
// const nums = [-1,0,1,2,-1,-4];
// const nums = [0];
// console.log('threeSum:', threeSum(nums));



//25. 最接近的三数之和(leetcode 16)
// 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
// 返回这三个数的和。假定每组输入只存在恰好一个解。
const threeSumClosest = (nums, target) => {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let best = 10000000;
    for(let i = 0; i < n; i++){
        // 保证和上一次枚举的元素不相等
        if(i > 0 && nums[i] === nums[i - 1]){
            continue;
        }
        // 使用双指针枚举 b 和 c
        let j = i + 1, k = n - 1;
        while(j < k){
            let sum = nums[i] + nums[j] + nums[k];
            // 如果和为 target 直接返回答案
            if(sum === target){
                return target;
            }
            // 根据差值的绝对值来更新答案
            if(Math.abs(sum - target) < Math.abs(best - target)){
                best = sum;
            }
            if(sum > target){
                 // 如果和大于 target，移动 c 对应的指针
                let k0 = k - 1;
                // 移动到下一个不相等的元素
                while(j < k0 && nums[k0] === nums[k]){
                    --k0;
                }
                k = k0;
            }else{
                // 如果和小于 target，移动 b 对应的指针
                let j0 = j + 1;
                // 移动到下一个不相等的元素
                while( j0 < k && nums[j0] === nums[j]){
                    ++j0;
                }
                j = j0;
            }
        }
    }
    return best;
}

// const nums = [-1,2,1,-4], target = 1;
// const nums = [0,0,0], target = 1;
// console.log('threeSumClosest:', threeSumClosest(nums, target));


//26. 有效的数独(leetcode 36)
/**
 * 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
*/
const isValidSudoku = (board) => {
    const rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
    const subboxs = new Array(9).fill(0).map(() => new Array(9).fill(0).map(() => new Array(9).fill(0)));
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            const c = board[i][j];
            if(c !== '.'){
                const index = c.charCodeAt() - '0'.charCodeAt() - 1;
                rows[i][index]++;
                columns[j][index]++;
                subboxs[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
                if(rows[i][index] > 1 || columns[j][index] > 1 || subboxs[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1){
                    return false;
                }
            }
        }
    }
    return true;
}
// const board = 
// [["5","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]];
// const board = 
// [["8","3",".",".","7",".",".",".","."]
// ,["6",".",".","1","9","5",".",".","."]
// ,[".","9","8",".",".",".",".","6","."]
// ,["8",".",".",".","6",".",".",".","3"]
// ,["4",".",".","8",".","3",".",".","1"]
// ,["7",".",".",".","2",".",".",".","6"]
// ,[".","6",".",".",".",".","2","8","."]
// ,[".",".",".","4","1","9",".",".","5"]
// ,[".",".",".",".","8",".",".","7","9"]];
// console.log('isValidSudoku:', isValidSudoku(board));


//27. 最小路径和(leetcode 64)
// 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。说明：每次只能向下或者向右移动一步。
// 方法一：动态规划
/**
 * 元素对应的最小路径和等于其上方相邻元素与其左方相邻元素两者对应的最小路径和中的最小值加上当前元素的值。
 * 由于每个元素对应的最小路径和与其相邻元素对应的最小路径和有关，因此可以使用动态规划求解。
 * 
 * 创建二维数组 dp，与原始网格的大小相同，dp[i][j] 表示从左上角出发到 (i,j) 位置的最小路径和。显然，dp[0][0]=grid[0][0]。
 * 对于 dp 中的其余元素，通过以下状态转移方程计算元素值。
 * 当 i>0 且 j=0 时，dp[i][0] = dp[i−1][0] + grid[i][0]。
 * 当 i=0 且 j>0 时，dp[0][j] = dp[0][j−1] + grid[0][j]。
 * 当 i>0 且 j>0 时，dp[i][j] = min(dp[i−1][j], dp[i][j−1]) + grid[i][j]。
*/
const minPathSum = (grid) => {
    if(grid == null || grid.length === 0 || grid[0].length === 0){
        return 0;
    }
    const rows = grid.length, columns = grid[0].length;
    const dp = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
    dp[0][0] = grid[0][0];
    for(let i = 1; i < rows; i++){
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }
    for(let j = 1; j < columns; j++){
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }
    for(let i = 1; i < rows; i++){
        for(let j = 1; j < columns; j++){
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }
    return dp[rows - 1][columns - 1];
}

// const grid = [[1,3,1],[1,5,1],[4,2,1]];
// const grid = [[1,2,3],[4,5,6]];
// console.log('minPathSum:', minPathSum(grid));


// 28. 跳跃游戏(leetcode 55)
// 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个下标。
// 方法一：贪心
/**
 * - 只要存在一个位置 x，它本身可以到达，并且它跳跃的最大长度为 x + nums[x]，这个值大于等于 y，即 x + nums[x] ≥ y，那么位置 y 也可以到达。
 * - 我们依次遍历数组中的每一个位置，并实时维护 最远可以到达的位置。对于当前遍历到的位置 xx，如果它在 最远可以到达的位置 的范围内，
 *   那么我们就可以从起点通过若干次跳跃到达该位置，因此我们可以用 x + nums[x] 更新 最远可以到达的位置。
*/
const canJump = (nums) => {
    const n = nums.length;
    let rightMost = 0;
    for(let i = 0; i < n; i++){
        if(i <= rightMost){
            rightMost = Math.max(rightMost, i + nums[i]);
            if(rightMost >= n - 1){
                return true;
            }
        }
    }
    return false;
}
// const nums = [2,3,1,1,4];
// const nums = [3,2,1,0,4];
// console.log('canJump:', canJump(nums));


//29. 移动零(leetcode 283)
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。请注意 ，必须在不复制数组的情况下原地对数组进行操作。
// 方法一：双指针
/**
 * 使用双指针，左指针指向当前已经处理好的序列的尾部，右指针指向待处理序列的头部。
 * 右指针不断向右移动，每次右指针指向非零数，则将左右指针对应的数交换，同时左指针右移
 * 注意到以下性质：
 * - 左指针左边均为非零数；
 * - 右指针左边直到左指针处均为零
*/
const moveZeroes = (nums) => {
    const n = nums.length;
    let left = 0, right = 0;
    while(right < n){
        if(nums[right] !== 0){
            swap1(nums, left, right);
            left++;
        }
        right++;
    }
}

function swap1(nums, left, right){
    const temp = nums[left];
    nums[left] = nums[right];
    nums[right] = temp;
}

// const nums = [0,1,0,3,12];
// const nums = [0];
// moveZeroes(nums);
// console.log('nums:', nums);


//30. 存在重复元素 II(leetcode 219)
// 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
// 满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
const containsNearbyDuplicate = (nums) => {
    const map = new Map();
    const n = nums.length;
    for(let i = 0; i < n; i++){
        const num = nums[i];
        if(map.has(num) && Math.abs(i - map.get(num) <= k)){
            return true;
        }
        map.set(num, i);
    }
    return false;
}
// const nums = [1,2,3,1], k = 3;
// const nums = [1,0,1,1], k = 1;
// const nums = [1,2,3,1,2,3], k = 2;
// console.log('containsNearbyDuplicate:', containsNearbyDuplicate(nums, k));


// 31. 汇总区间(leetcode 228)
/**
 * 给定一个  无重复元素 的 有序 整数数组 nums 。返回 恰好覆盖数组中所有数字 的 最小有序 区间范围列表 。
 * 也就是说，nums 的每个元素都恰好被某个区间范围所覆盖，并且不存在属于某个范围但不属于 nums 的数字 x 。
 * 列表中的每个区间范围 [a,b] 应该按如下格式输出：
 * · "a->b" ，如果 a != b
 * · "a" ，如果 a == b
*/
const summaryRanges = (nums) => {
    const ans = [];
    const n = nums.length;
    let i = 0;
    while(i < n){
        const low = i;
        i++;
        while(i < n && nums[i] === nums[i - 1] + 1){
            i++;
        }
        const high = i - 1;
        const temp = ['' + nums[low]];
        if(low < high){
            temp.push('->');
            temp.push(nums[high]);
        }
        ans.push(temp.join(''));
    }
    return ans;
}

// const nums = [0,1,2,4,5,7];
// const nums = [0,2,3,4,6,8,9];
// console.log('summaryRanges:', summaryRanges(nums));


// 32. 子集 II(leetcode 90)
// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
const subsetsWithDup = (nums) => {
    nums.sort((a, b) => a - b);
    let t = [], ans = [];
    const dfs = (choosePre, cur, nums) => {
        if(cur === nums.length){
            ans.push(t.slice());
            return;
        }
        dfs(false, cur + 1, nums);
        if(!choosePre && cur > 0 && nums[cur - 1] === nums[cur]){
            return;
        }
        t.push(nums[cur]);
        dfs(true, cur + 1, nums);
        t = t.slice(0, t.length - 1);
    }
    dfs(false, 0, nums);
    return ans;
}

// const nums = [1,2,2];
// const nums = [0];
// console.log('subsetsWithDup:', subsetsWithDup(nums));


// 33. 三角形最小路径和(leetcode 120)
// 给定一个三角形 triangle ，找出自顶向下的最小路径和。
// 每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。
// 也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
const minimumTotal = (triangle) => {
    const n = triangle.length;
    const f = new Array(n).fill(0).map(() => new Array(n).fill(0));
    f[0][0] = triangle[0][0];
    for(let i = 1; i < n; i++){
        f[i][0] = f[i - 1][0] + triangle[i][0];
        for(let j = 1; j < i; j++){
            f[i][j] = Math.min(f[i - 1][j - 1], f[i - 1][j]) + triangle[i][j];
        }
        f[i][i] = f[i - 1][i - 1] + triangle[i][i];
    }
    let minTotal = f[n - 1][0];
    for(let i = 1; i < n; i++){
        minTotal = Math.min(minTotal, f[n - 1][i]);
    }
    return minTotal;
}

// const triangle = [[2],[3,4],[6,5,7],[4,1,8,3]];
// const triangle = [[-10]];
// console.log('minimumTotal:', minimumTotal(triangle));


//34. 区域和检索 - 数组不可变(leetcode 303)
/**
 * 给定一个整数数组  nums，处理以下类型的多个查询:
 * 计算索引 left 和 right （包含 left 和 right）之间的 nums 元素的 和 ，其中 left <= right
 * 实现 NumArray 类：
 * - NumArray(int[] nums) 使用数组 nums 初始化对象
 * - int sumRange(int i, int j) 返回数组 nums 中索引 left 和 right 之间的元素的 总和 ，包含 left 和 right 两点
 * （也就是 nums[left] + nums[left + 1] + ... + nums[right] )
*/
const NumArray = function(nums) {
    const n = nums.length;
    this.nums = new Array(n).fill(0);
    for(let i = 0; i < n; i++){
        this.nums[i + 1] = this.nums[i] + nums[i];
    }
}
NumArray.prototype.sumRange = function(left, right) {
    return this.nums[right + 1] - this.nums[left];
}

// const nums = [-2, 0, 3, -5, 2, -1];
// const left = 0;
// const right = 2;
// var obj = new NumArray(nums)
// var param_1 = obj.sumRange(left,right)
// console.log('param_1:', param_1);


// 35. 乘积最大子数组(leetcode 152)
// 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
// 测试用例的答案是一个 32-位 整数。子数组 是数组的连续子序列。
// 方法一：动态规划
const maxProduct = (nums) => {
    let maxF = nums[0], minF = nums[0], ans = nums[0];
    for(let i = 1; i < nums.length; i++){
        let mx = maxF, mn = minF;
        maxF = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
        minF = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
        ans = Math.max(ans, maxF);
    }
    return ans;
}

// const nums = [2,3,-2,4];
// const nums = [-2,0,-1];
// const nums = [-2];
// const nums = [-2, 1, -1, 1];
// console.log('maxProduct:', maxProduct(nums));


// 36. 两数之和 II - 输入有序数组(leetcode 167)
/**
 * 给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，
 * 则 1 <= index1 < index2 <= numbers.length 。
 * 以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。
 * 你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。
 * 你所设计的解决方案必须只使用常量级的额外空间。
*/
const twoSum1 = (numbers, target) => {
    let low = 0, high = numbers.length - 1;
    while(low < high){
        const sum = numbers[low] + numbers[high];
        if(sum === target){
            return [low + 1, high + 1];
        }else if(sum < target){
            low++;
        }else{
            high--;
        }
    }
    return [-1, -1];
}

// const numbers = [2,7,11,15], target = 9;
// const numbers = [2,3,4], target = 6;
// const numbers = [-1,0], target = -1;
// console.log('twoSum1:', twoSum1(numbers, target));

// 37. 两个数组的交集(leetcode 349)
// 给定两个数组 nums1 和 nums2 ，返回 它们的交集 。输出结果中的每个元素一定是 唯一 的。我们可以 不考虑输出结果的顺序 。
const intersection = (nums1, nums2) => {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    return set_intersection(set1, set2);
}

const set_intersection = (set1, set2) => {
    if(set1.size > set2.size){
        return set_intersection(set2, set1);
    }
    const intersection = new Set();
    for(const num of set1){
        if(set2.has(num)){
            intersection.add(num);
        }
    }
    return [...intersection];
}

// const nums1 = [1,2,2,1], nums2 = [2,2];
// const nums1 = [4,9,5], nums2 = [9,4,9,8,4];
// console.log('intersection:', intersection(nums1, nums2));


// 38. 寻找旋转排序数组中的最小值(leetcode 153)
/**
 * 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
 * - 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
 * - 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
 * 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。
 * 给你一个元素值 互不相同 的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
*/
const findMin = (nums) => {
    let low = 0;
    let high = nums.length - 1;
    while(low < high){
        const pivot = low + Math.floor((high - low) / 2);
        if(nums[pivot] < nums[high]){
            high = pivot;
        }else{
            low = pivot + 1;
        }
    }
    return nums[low];
}

// const nums = [3,4,5,1,2];
// const nums = [4,5,6,7,0,1,2];
// const nums = [11,13,15,17];
// console.log('findMin:', findMin(nums));


// 39. 寻找峰值(leetcode 162)
/**
 * 峰值元素是指其值严格大于左右相邻值的元素。
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
 * 你可以假设 nums[-1] = nums[n] = -∞ 。
 * 你必须实现时间复杂度为 O(log n) 的算法来解决此问题。
*/
const findPeakElement = (nums) => {
    const n = nums.length;
    let left = 0, right = n - 1, ans = -1;
    while(left <= right){
        const mid = Math.floor((left + right) / 2);
        if(compare(nums, mid - 1, mid) < 0 && compare(nums, mid, mid + 1) > 0){
            ans = mid;
            break;
        }
        if(compare(nums, mid, mid + 1) < 0){
            left = mid + 1;
        }else{
            right = mid - 1;
        }
    }
    return ans;
}

const get = (nums, idx) => {
    if(idx === -1 || idx === nums.length){
        return [0, 0];
    }
    return [1, nums[idx]];
}

const compare = (nums, idx1, idx2) => {
    const num1 = get(nums, idx1);
    const num2 = get(nums, idx2);
    if(num1[0] !== num2[0]){
        return num1[0] > num2[0] ? 1 : -1;
    }
    if(num1[1] === num2[2]){
        return 0;
    }
    return num1[1] > num2[1] ? 1 : -1;
}

// const nums = [1,2,3,1];
// const nums = [1,2,1,3,5,6,4];
// console.log('findPeakElement:', findPeakElement(nums));


// 40. 轮转数组(leetcode 189)
// 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
const rotate1 = (nums, k) => {
    let i = 1;
    while(i <= k){
        const val = nums.pop();
        nums.unshift(val);
        i++;
    }
    return nums;
}

// 方法二：数组翻转
const reverse1 = (nums, start, end) => {
    while(start <= end){
        const temp = nums[end];
        nums[end] = nums[start];
        nums[start] = temp;
        start++;
        end--;
    }
}

const rotate2 = (nums, k) => {
    const n = nums.length;
    k = k % n;
    reverse1(nums, 0, n - 1);
    reverse1(nums, 0, k - 1);
    reverse1(nums, k, n - 1);
    return nums;
}

// 方法三：使用额外的数组
const rotate3 = (nums, k) => {
    const n = nums.length;
    const newArr = new Array(n);
    for(let i = 0; i < n; i++){
        newArr[(i + k) % n] = nums[i];
    }
    for(let i = 0; i < n; i++){
        nums[i] = newArr[i];
    }
    return nums;
}


// const nums = [1,2,3,4,5,6,7], k = 3;
// const nums = [-1,-100,3,99], k = 2;
// console.log('rotate:', rotate3(nums, k));


// 41. 第三大的数(leetcode 414)
// 给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。
const thirdMax1 = (nums) => {
    nums.sort((a, b) => b - a);
    for(let i = 1, diff = 1; i < nums.length; i++){
        if(nums[i] !== nums[i - 1] && ++diff === 3){
            return nums[i];
        }
    }
    return nums[0];
}

const thirdMax2 = (nums) => {
    let first = -Number.MAX_VALUE, second = -Number.MAX_VALUE, third = -Number.MAX_VALUE;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] > first){
            third = second;
            second = first;
            first = nums[i];
        }else if(nums[i] > second && nums[i] < first){
            third = second;
            second = nums[i];
        }else if(nums[i] > third && nums[i] < second){
            third = nums[i];
        }
    }
    return third === -Number.MAX_VALUE ? first : third;
}


// const nums = [3, 2, 1];
// const nums = [1, 2];
// const nums = [2, 2, 3, 1];
// console.log('thirdMax:', thirdMax2(nums));


// 42. 找到所有数组中消失的数字(leetcode 448)
// 给你一个含 n 个整数的数组 nums ，其中 nums[i] 在区间 [1, n] 内。请你找出所有在 [1, n] 范围内但没有出现在 nums 中的数字，并以数组的形式返回结果。
const findDisappearedNumbers = (nums) => {
    const n = nums.length;
    const set = new Set(nums);
    const ans = [];
    for(let i = 1; i <= n; i++){
        if(!set.has(i)){
            ans.push(i);
        }
    }
    return ans;
}

// const nums = [4,3,2,7,8,2,3,1];
// const nums = [1,1];
// console.log('findDisappearedNumbers:', findDisappearedNumbers(nums));


// 43. 最小操作次数使数组元素相等(leetcode 453)
// 给你一个长度为 n 的整数数组，每次操作将会使 n - 1 个元素增加 1 。返回让数组所有元素相等的最小操作次数。
/**
 * 因为只需要找出让数组所有元素相等的最小操作次数，所以我们不需要考虑数组中各个元素的绝对大小，
 * 即不需要真正算出数组中所有元素相等时的元素值，只需要考虑数组中元素相对大小的变化即可。
 * 因此，每次操作既可以理解为使 n-1n−1 个元素增加 11，也可以理解使 11 个元素减少 11。显然，后者更利于我们的计算。
*/
const minMoves = (nums) => {
    const minNum = Math.min(...nums);
    let res = 0;
    for(const num of nums){
        res += num - minNum;
    }
    return res;
}

// const nums = [1,2,3];
// const nums = [1,1,1];
// console.log('minMoves:', minMoves(nums));


// 44. 分发饼干(leetcode 455)
/**
 * 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。
 * 对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。
 * 如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
*/
const findContentChildren = (g, s) => {
    g.sort((a, b) => a - b);
    s.sort((a, b) => a - b);
    const gLen = g.length, sLen = s.length;
    let count = 0;
    for(let i = 0, j = 0; i < gLen && j < sLen; i++, j++) {
        while(j < sLen && g[i] > s[j]){
            j++;
        }
        if(j < sLen){
            count++;
        }
    }
    return count;
}
// const g = [1,2,3], s = [1,1];
// const g = [1,2], s = [1,2,3];
// const g = [10,9,8,7], s = [5,6,7,8];
// console.log('findContentChildren:', findContentChildren(g, s));


// 45. 打家劫舍(leetcode 198)
// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
const rob = (nums) => {
    if(nums == null || nums.length === 0){
        return 0;
    }
    if(nums.length === 1){
        return nums[0];
    }
    const n = nums.length;
    let first = nums[0], second = Math.max(nums[0], nums[1]);
    for(let i = 2; i < n; i++){
        const temp = second;
        second = Math.max(first + nums[i], second);
        first = temp;
    }
    return second;
}

// const nums = [1,2,3,1];
// const nums = [2,7,9,3,1];
// console.log('rob:', rob(nums));


// 46. 在长度 2N 的数组中找出重复 N 次的元素(leetcode 961)
/**
 * 给你一个整数数组 nums ，该数组具有以下属性：
 * - nums.length == 2 * n.
 * - nums 包含 n + 1 个 不同的 元素
 * - nums 中恰有一个元素重复 n 次
 * - 找出并返回重复了 n 次的那个元素。
*/
const repeatedNTimes = (nums) => {
    const set = new Set();
    for(const num of nums){
        if(set.has(num)){
            return num;
        }
        set.add(num);
    }
    return -1;
}

// const nums = [1,2,3,3];
// const nums = [2,1,2,5,3,2];
// const nums = [5,1,5,2,5,3,5,4];
// console.log('repeatedNTimes:', repeatedNTimes(nums));


// 47. 岛屿数量(leetcode 200)
/**
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
*/
// 方法一：广度优先搜索
const numIslands = (grid) => {
    if(grid == null || grid.length === 0){
        return 0;
    }
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    const dfs = (grid, row, col) => {
        if(row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === '0'){
            return;
        }
        grid[row][col] = '0';
        dfs(grid, row - 1, col);
        dfs(grid, row + 1, col);
        dfs(grid, row, col - 1);
        dfs(grid, row, col + 1);
    }

    for(let i = 0; i < m; i++){
        for(let j = 0; j < n; j++){
            if(grid[i][j] === '1'){
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}

// const grid = [
//     ["1","1","1","1","0"],
//     ["1","1","0","1","0"],
//     ["1","1","0","0","0"],
//     ["0","0","0","0","0"]
// ];
// const grid = [
//     ["1","1","0","0","0"],
//     ["1","1","0","0","0"],
//     ["0","0","1","0","0"],
//     ["0","0","0","1","1"]
// ];
// console.log('numIslands:', numIslands(grid));


// 48. 计数质数(leetcode 204)
// 给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。
// 方法一：枚举
/**
 * 考虑质数的定义：在大于 1 的自然数中，除了 1 和它本身以外不再有其他因数的自然数。因此对于每个数 x，
 * 我们可以从小到大枚举 [2, x−1] 中的每个数 y，判断 y 是否为 x 的因数。
 * 但这样判断一个数是否为质数的时间复杂度最差情况下会到 O(n)，无法通过所有测试数据。考虑到如果 y 是 x 的因数，
 * 那么 x / y 也必然是 x 的因数，因此我们只要校验 y 或者 x / y 即可。而如果我们每次选择校验两者中的较小数，
 * 则不难发现较小数一定落在 [2, Math.sqrt(x)] 的区间中，因此我们只需要枚举 [2, Math.sqrt(x)] 中的所有数即可，
 * 这样单次检查的时间复杂度从 O(n) 降低至了 O(Math.sqrt(n))。
*/
const countPrimes1 = (n) => {
    let ans = 0;
    for(let i = 2; i < n; i++){
        ans += isPrime(i);
    }
    return ans;
}

const isPrime = (x) => {
    for(let i = 2; i * i <= x; i++){
        if(x % i === 0){
            return false;
        }
    }
    return true;
}

// 方法二：埃氏筛
/**
 * 我们考虑这样一个事实：如果 xx 是质数，那么大于 x 的 x 的倍数 2x,3x,… 一定不是质数，因此我们可以从这里入手。
 * 我们设 isPrime[i] 表示数 i 是不是质数，如果是质数则为 1，否则为 0。从小到大遍历每个数，如果这个数为质数，
 * 则将其所有的倍数都标记为合数（除了该质数本身），即 0，这样在运行结束的时候我们即能知道质数的个数。
*/
const countPrimes2 = (n) => {
    const isPrimes = new Array(n).fill(1);
    let ans = 0;
    for(let i = 2; i < n; i++){
        if(isPrimes[i]){
            ans++;
            for(let j = i * i; j < n; j += i){
                isPrimes[j] = 0;
            }
        }
    }
    return ans;
}

// const n = 367184;
// console.log('countPrimes:', countPrimes2(n));


// 49. 岛屿的周长(leetcode 463)
/**
 * 给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。
 * 网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
 * 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。
*/
const islandPerimeter = (grid) => {
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    const n = grid.length, m = grid[0].length;
    let ans = 0;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(grid[i][j]){
                let cnt = 0;
                for(let k = 0; k < 4; ++k){
                    let tx = i + dx[k];
                    let ty = j + dy[k];
                    if(tx < 0 || tx >= n || ty < 0 || ty >= m || !grid[tx][ty]){
                        cnt += 1;
                    }
                }
                ans += cnt;
            }
        }
    }
    return ans;
}

// const grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]];
// const grid = [[1]];
// const grid = [[1,0]];
// console.log('islandPerimeter:', islandPerimeter(grid));


// 50. 长度最小的子数组(leetcode 209)
// 给定一个含有 n 个正整数的数组和一个正整数 target 。找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 
// [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
// 方法一：暴力法
const minSubArrayLen1 = (target, nums) => {
    const n = nums.length;
    let ans = Number.MAX_VALUE;
    for(let i = 0; i < n; i++){
        let sum = 0;
        for(let j = i; j < n; j++){
            sum += nums[j];
            if(sum >= target){
                ans = Math.min(ans, j - i + 1);
                break;
            }
        }
    }
    return ans === Number.MAX_VALUE ? 0 : ans;
}

// 方法二：滑动窗口
/**
 * 定义两个指针 start 和 end 分别表示子数组（滑动窗口窗口）的开始位置和结束位置，维护变量sum 存储子数组中的元素和（即从 nums[start] 到 nums[end] 的元素和）。
 * 初始状态下，start 和 end 都指向下标 0，sum 的值为 0。
 * 每一轮迭代，将 nums[end] 加到 sum，如果 sum≥s，则更新子数组的最小长度（此时子数组的长度是 end−start+1），然后将 nums[start] 从 sum 中减去并将 start 右移，
 * 直到 sum<s，在此过程中同样更新子数组的最小长度。在每一轮迭代的最后，将 end 右移。
*/
const minSubArrayLen2 = (target, nums) => {
    const n = nums.length;
    if(n === 0){
        return 0;
    }
    let ans = Number.MAX_VALUE;
    let sum = 0;
    let start = 0, end = 0;
    while(end < n){
        sum += nums[end];
        while(sum >= target){
            ans = Math.min(ans, end - start + 1);
            sum -= nums[start];
            start++;
        }
        end++;
    }
    return ans === Number.MAX_VALUE ? 0 : ans;
}

// const target = 7, nums = [2,3,1,2,4,3];
// const target = 4, nums = [1,4,4];
// const target = 11, nums = [1,1,1,1,1,1,1,1];
// console.log('minSubArrayLen:', minSubArrayLen2(target, nums));


// 51. 最大连续 1 的个数(leetcode 485)
// 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。
const findMaxConsecutiveOnes = (nums) => {
    const n = nums.length;
    let ans = 0, i = 0;
    while(i < n){
        let num = 0;
        while(nums[i] === 1){
            num++;
            i++;
        }
        ans = Math.max(ans, num);
        while(nums[i] === 0){
            i++;
        }
    }
    return ans;
}

// const nums = [1,1,0,1,1,1];
// const nums = [1,0,1,1,0,1];
// console.log('findMaxConsecutiveOnes:', findMaxConsecutiveOnes(nums));


// 52. 提莫攻击(leetcode 495)
/**
 * 在《英雄联盟》的世界中，有一个叫 “提莫” 的英雄。他的攻击可以让敌方英雄艾希（编者注：寒冰射手）进入中毒状态。
 * 当提莫攻击艾希，艾希的中毒状态正好持续 duration 秒
 * 正式地讲，提莫在 t 发起发起攻击意味着艾希在时间区间 [t, t + duration - 1]（含 t 和 t + duration - 1）处于中毒状态。
 * 如果提莫在中毒影响结束 前 再次攻击，中毒状态计时器将会 重置 ，在新的攻击之后，中毒影响将会在 duration 秒后结束。
 * 给你一个 非递减 的整数数组 timeSeries ，其中 timeSeries[i] 表示提莫在 timeSeries[i] 秒时对艾希发起攻击，以及一个表示中毒持续时间的整数 duration 。
 * 返回艾希处于中毒状态的 总 秒数。
*/
/**
 * 示例：
 * 输入：timeSeries = [1,4], duration = 2
 * 输出：4
 * 解释：提莫攻击对艾希的影响如下：
 * - 第 1 秒，提莫攻击艾希并使其立即中毒。中毒状态会维持 2 秒，即第 1 秒和第 2 秒。
 * - 第 4 秒，提莫再次攻击艾希，艾希中毒状态又持续 2 秒，即第 4 秒和第 5 秒。
 * 艾希在第 1、2、4、5 秒处于中毒状态，所以总中毒秒数是 4 。
*/
const findPoisonedDuration1 = (timeSeries, duration) => {
    const ans = new Set();
    for(let i = 0; i < timeSeries.length; i++){
        for(let j = timeSeries[i]; j < timeSeries[i] + duration; j++){
            ans.add(j);
        }
    }
    return [...ans].length;
}

const findPoisonedDuration2 = (timeSeries, duration) => {
    let ans = 0;
    let expired = 0;
    for(let i = 0; i < timeSeries.length; i++){
        if(timeSeries[i] >= expired){
            ans += duration;
        }else{
            ans += timeSeries[i] + duration - expired;
        }
        expired = timeSeries[i] + duration;
    }
    return ans;
}
// const timeSeries = [1,4], duration = 2;
// const timeSeries = [1,2], duration = 2;
// console.log('findPoisonedDuration:', findPoisonedDuration2(timeSeries, duration));


// 53. 数组中的第K个最大元素(leetcode 215)
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
// 方法一：基于快速排序的选择方法
const findKthLargest = (nums, k) => {

    const quickSelect = (nums, l, r, index) => {
        const q = randomPartition(nums, l, r);
        if(q === index){
            return nums[q];
        }else{
            return q < index ? quickSelect(nums, q + 1, r, index) : quickSelect(nums, l, q - 1, index);
        }
    }

    const randomPartition = (nums, l, r) => {
        let i = Math.floor(Math.random() * (r - l + 1)) + l;
        swap(nums, i, r);
        return partition(nums, l, r);
    }

    const partition = (nums, l, r) => {
        let x = nums[r], i = l - 1;
        for(let j = l; j < r; j++){
            if(nums[j] <= x){
                swap(nums, ++i, j);
            }
        }
        swap(nums, i + 1, r);
        return i + 1;
    }

    const swap = (nums, l, r) => {
        const temp = nums[l];
        nums[l] = nums[r];
        nums[r] = temp;
    }

    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

// const nums = [3,2,1,5,6,4], k = 2;
// const nums = [3,2,3,1,2,4,5,5,6], k = 4;
// console.log('findKthLargest:', findKthLargest(nums, k));


// 54. 打家劫舍 II(leetcode 213)
// 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 围成一圈 ，
// 这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警 。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 在不触动警报装置的情况下 ，今晚能够偷窃到的最高金额。
// 方法一：动态规划
const rob1 = (nums) => {
    const len = nums.length;
    if(len === 1){
        return nums[0];
    }else if(len === 2){
        return Math.max(nums[0], nums[1]);
    }
    return Math.max(robRange(nums, 0, len - 2), robRange(nums, 1, len - 1));
}

const robRange = (nums, start, end) => {
    let first = nums[start], second = Math.max(nums[start], nums[start + 1]);
    for(let i = start + 2; i <= end; i++){
        const temp = second;
        second = Math.max(first + nums[i], second);
        first = temp;
    }
    return second;
}

// const nums = [2,3,2];
// const nums = [1,2,3,1];
// const nums = [1,2,3];
// console.log('rob1:', rob1(nums));


// 55. 组合总和 III(leetcode 216)
/**
 * 找出所有相加之和为 n 的 k 个数的组合，且满足下列条件：
 * - 只使用数字1到9
 * - 每个数字 最多使用一次 
 * 返回 所有可能的有效组合的列表 。该列表不能包含相同的组合两次，组合可以以任何顺序返回。
*/
// 方法一：二进制（子集）枚举
const combinationSum31 = (k, n) => {
    let temp = [];
    const ans = [];

    const check = (mask, k, n) => {
        temp = [];
        for(let i = 0; i < 9; i++){
            if((1 << i) & mask){
                temp.push(i + 1);
            }
        }
        return temp.length === k && temp.reduce((prev, val) => val + prev, 0) === n;
    }

    for(let mask = 0; mask < (1 << 9); mask++){
        if(check(mask, k, n)){
            ans.push(temp);
        }
    }
    return ans;
}

// 方法二：组合枚举
const combinationSum32 = (k, n) => {
    const res = [];
    const temp = [];
    const dfs = (cur, n, k, sum, res) => {
        if(temp.length + (n - cur + 1) < k || temp.length > k){
            return;
        }
        if(temp.length === k && temp.reduce((prev, val) => prev + val, 0) === sum){
            res.push(temp.slice());
            return;
        }
        temp.push(cur);
        dfs(cur + 1, n, k, sum, res);
        temp.pop();
        dfs(cur + 1, n, k, sum, res);
    }

    dfs(1, 9, k, n, res);
    return res;
}

// const k = 3, n = 7;
// const k = 3, n = 9;
// console.log('combinationSum3:', combinationSum32(k, n));


// 56. 存在重复元素 III(leetcode 220)
// 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
// 如果存在则返回 true，不存在返回 false。
const containsNearbyAlmostDuplicate1 = (nums, k, t) => {
    const n = nums.length;
    for(let i = 0; i < n; i++){
        for(let j = i; j < n; j++){
            if(Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k && i !== j){
                return true;
            }
        }
    }
    return false;
}

// 方法二：桶
const containsNearbyAlmostDuplicate2 = (nums, k, t) => {
    const n = nums.length;
    const mp = new Map();
    for(let i = 0; i < n; i++){
        const x = nums[i];
        const id = getID(x, t + 1);
        if(mp.has(id)){
            return true;
        }
        if(mp.has(id - 1) && Math.abs(x - mp.get(id - 1)) <= t){
            return true;
        }
        if(mp.has(id + 1) && Math.abs(x - mp.get(id + 1)) <= t){
            return true;
        }
        mp.set(id, x);
        if(i >= k){
            mp.delete(getID(nums[i - k], t + 1));
        }
    }
    return false;
}

const getID = (x, w) => {
    return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
}

// const nums = [1,2,3,1], k = 3, t = 0;
// const nums = [1,0,1,1], k = 1, t = 2;
// const nums = [1,5,9,1,5,9], k = 2, t = 3;
// console.log('containsNearbyAlmostDuplicate:', containsNearbyAlmostDuplicate2(nums, k, t));


// 57. 组合总和 II(leetcode 40)
// 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
// candidates 中的每个数字在每个组合中只能使用 一次 。
// 注意：解集不能包含重复的组合。 
const combinationSum2 = (candidates, target) => {
    const freq = [];
    const ans = [];
    const sequence = [];

    candidates.sort((a, b) => a - b);
    for(const num of candidates){
        const len = freq.length;
        if(len === 0 || num !== freq[len - 1][0]){
            freq.push([num, 1]);
        }else{
            ++freq[len - 1][1];
        }
    }
    console.log('freq:', freq);
    const dfs = (pos, rest) => {
        if(rest === 0){
            ans.push(sequence);
            return;
        }
        if(pos === freq.length || rest < freq[pos][0]){
            return;
        }
        dfs(pos + 1, rest);
        const most = Math.min(Math.floor(rest / freq[pos][0]), freq[pos][1]);
        for(let i = 1; i <= most; i++){
            sequence.push(freq[pos][0]);
            dfs(pos + 1, rest - i * freq[pos][0]);
        }
        for(let i = 1; i <= most; i++){
            sequence.pop();
        }
    }

    dfs(0, target);
    return ans;
}

// const candidates = [10,1,2,7,6,1,5], target = 8;
// console.log('combinationSum2:', combinationSum2(candidates, target));


// 58. 多数元素 II(leetcode 229)
// 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
const majorityElement2 = (nums) => {
    const ans = [];
    const n = nums.length;
    const map = new Map();
    for(const num of nums) {
        if(!map[num]){
            map[num] = 1;
        }else{
            ++map[num];
        }
    }
    for(const key in map){
        if(map[key] > n / 3){
            ans.push(Number(key));
        }
    }
    return ans;
}
// const nums = [3,2,3];
// const nums = [1];
// const nums = [1,2];
// console.log('majorityElement2:', majorityElement2(nums));


// 59. 除自身以外数组的乘积(leetcode 238)
// 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
// 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
// 请不要使用除法，且在 O(n) 时间复杂度内完成此题。
// 方法一：左右乘积列表
const productExceptSelf1 = (nums) => {
    const n = nums.length;
    // L 和 R 分别表示左右两侧的乘积列表
    const L = new Array(n);
    const R = new Array(n);
    const answer = new Array(n);

    // L[i] 为索引 i 左侧所有元素的乘积
    // 对于索引为 '0' 的元素，因为左侧没有元素，所以 L[0] = 1
    L[0] = 1;
    for(let i = 1; i < n; i++){
        L[i] = nums[i - 1] * L[i - 1];
    }

    // R[i] 为索引 i 右侧所有元素的乘积
    // 对于索引为 'length-1' 的元素，因为右侧没有元素，所以 R[length-1] = 1
    R[n - 1] = 1;
    for(let i = n - 2; i >= 0; i--){
        R[i] = nums[i + 1] * R[i + 1];
    }

    // 对于索引 i，除 nums[i] 之外其余各元素的乘积就是左侧所有元素的乘积乘以右侧所有元素的乘积
    for(let i = 0; i < n; i++){
        answer[i] = L[i] * R[i];
    }
    return answer;
}

// 方法二：空间复杂度 O(1)O(1) 的方法
/**
 * 思路：
 * 初始化 answer 数组，对于给定索引 i，answer[i] 代表的是 i 左侧所有数字的乘积。
 * 构造方式与之前相同，只是我们试图节省空间，先把 answer 作为方法一的 L 数组。
 * 这种方法的唯一变化就是我们没有构造 R 数组。而是用一个遍历来跟踪右边元素的乘积。
 * 并更新数组 answer[i] = answer[i] ∗ R。然后 RR 更新为 R = R ∗ nums[i]，其中变量 R 表示的就是索引右侧数字的乘积。
*/
const productExceptSelf2 = (nums) => {
    const n = nums.length;
    const answer = new Array(n);

    answer[0] = 1;
    for(let i = 1; i < n; i++){
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    let R = 1;
    for(let i = n - 1; i >= 0; i--){
        answer[i] = answer[i] * R;
        R *= nums[i];
    }
    return answer;
}

// const nums = [1,2,3,4];
// const nums = [-1,1,0,-3,3];
// console.log('productExceptSelf:', productExceptSelf2(nums));


// 60. 最大正方形(leetcode 221)
// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
// 方法一：动态规划
// 状态转移方程：dp(i,j) = min(dp(i−1, j), dp(i−1, j−1), dp(i, j−1)) + 1
const maximalSquare = (matrix) => {
    let maxSide = 0;
    const row = matrix.length, column = matrix[0].length;
    const dp = new Array(row).fill(0).map(() => new Array(column).fill(0));
    for(let i = 0; i < row; i++){
        for(let j = 0; j < column; j++){
            if(matrix[i][j] === '1'){
                if(i === 0 || j === 0){
                    dp[i][j] = 1;
                }else{
                    dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
                }
            }
            maxSide = Math.max(maxSide, dp[i][j]);
        }
    }
    return maxSide * maxSide;
}
// const matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]];
// const matrix = [["0","1"],["1","0"]];
// const matrix = [["0"]];
// console.log('maximalSquare:', maximalSquare(matrix));


// 61. 滑动窗口最大值(leetcode 239)
// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
// 返回 滑动窗口中的最大值 。
// 方法二：单调队列
const maxSlidingWindow = (nums, k) => {
    const n = nums.length;
    const q = [];
    for(let i = 0; i < k; i++){
        while(q.length && nums[i] >= nums[q[q.length - 1]]){
            q.pop();
        }
        q.push(i);
    }

    const ans = [nums[q[0]]];
    for(let i = k; i < n; i++){
        while(q.length && nums[i] >= nums[q[q.length - 1]]){
            q.pop();
        }
        q.push(i);
        while(q[0] <= i - k){
            q.shift();
        }
        ans.push(nums[q[0]]);
    }
    return ans;
}

const nums = [1,3,-1,-3,5,3,6,7], k = 3;
// const nums = [1], k = 1;
console.log('maxSlidingWindow:', maxSlidingWindow(nums, k));