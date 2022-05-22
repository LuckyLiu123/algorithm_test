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
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
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

const nums = [-2, 0, 3, -5, 2, -1];
const left = 0;
const right = 2;
var obj = new NumArray(nums)
var param_1 = obj.sumRange(left,right)
console.log('param_1:', param_1);





























