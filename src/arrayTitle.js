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

const nums = [2,3,1,1,4];
console.log('jump:', jump1(nums));






















