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

const nums = [3,0,1];
// const nums = [0,1];
// const nums = [9,6 ,4,2,3,5,7,0,1];
// const nums = [0];
console.log('missingNumber:', missingNumber2(nums));











































































