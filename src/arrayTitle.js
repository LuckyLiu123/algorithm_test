//1. 合并两个有序数组
// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
// 方法一： 直接合并之后再排序
const merge1 = (nums1, m, nums2, n) => {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i];
  }
  nums1.sort((a, b) => a - b);
  return nums1;
};

//方法二：双指针
// 将两个数组看作队列，每次从两个数组头部取出比较小的数字放到结果中
const merge2 = (nums1, m, nums2, n) => {
  let p1 = 0,
    p2 = 0;
  let sorted = new Array(m + n).fill(0);
  let cur;
  while (p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++];
    } else if (p2 === n) {
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }
    sorted[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i < m + n; i++) {
    nums1[i] = sorted[i];
  }
  return nums1;
};

//逆向双指针
// 可以指针设置为从后向前遍历，每次取两者之中的较大者放进 nums1 的最后面
const merge3 = (nums1, m, nums2, n) => {
  let p1 = m - 1,
    p2 = n - 1;
  let tail = m + n - 1;
  let cur;
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--];
    } else if (p2 === -1) {
      cur = nums1[p1--];
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--];
    } else {
      cur = nums2[p2--];
    }
    nums1[tail--] = cur;
  }
  return nums1;
};

// const nums1 = [1,2,3,0,0,0], m = 3, nums2 =  [2,5,6], n = 3;
// const nums1 = [1], m = 1, nums2 = [], n = 0;
// console.log('merge', merge3(nums1, m, nums2, n));

//2. 盛最多水的容器(leetcode 11)
// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。
// 说明：你不能倾斜容器。
// 双指针法
const maxArea = function (height) {
  let l = 0,
    r = height.length - 1;
  let ans = 0;
  while (l < r) {
    const area = Math.min(height[l], height[r]) * (r - l);
    ans = Math.max(ans, area);
    if (height[l] <= height[r]) {
      l++;
    } else {
      r--;
    }
  }
  return ans;
};

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
const nextPermutation = function (nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[i] >= nums[j]) {
      j--;
    }
    swap(nums, i, j);
  }
  reverse(nums, i + 1);
  return nums;
};

function swap(nums, i, j) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

function reverse(nums, start) {
  let left = start,
    right = nums.length - 1;
  while (left < right) {
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
  if (intervals.length === 0) {
    return [[]];
  }
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  for (let i = 0; i < intervals.length; i++) {
    let L = intervals[i][0],
      R = intervals[i][1];
    if (merged.length === 0 || merged[merged.length - 1][1] < L) {
      merged.push([L, R]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
    }
  }
  return merged;
};

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
  if (intervals.length === 0) return [newInterval];
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  for (let i = 0; i < intervals.length; i++) {
    let L = intervals[i][0],
      R = intervals[i][1];
    if (merged.length === 0 || merged[merged.length - 1][1] < L) {
      merged.push([L, R]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], R);
    }
  }
  return merged;
};

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
  let row = 0,
    column = 0;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; //右下左上
  let directionIndex = 0;
  while (curNum <= maxNum) {
    matrix[row][column] = curNum++;
    const nextRow = row + directions[directionIndex][0],
      nextColumn = column + directions[directionIndex][1];
    if (
      nextRow < 0 ||
      nextRow >= n ||
      nextColumn < 0 ||
      nextColumn >= n ||
      matrix[nextRow][nextColumn] !== 0
    ) {
      directionIndex = (directionIndex + 1) % 4; //顺时针旋转至下一个方向
    }
    row = row + directions[directionIndex][0];
    column = column + directions[directionIndex][1];
  }
  return matrix;
};

// console.log('generateMatrix:', generateMatrix(5));

//7. 最长连续序列(leetcode 128)
// 给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
// 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
const longestConsecutive = function (nums) {
  const num_set = new Set();
  for (const num of nums) {
    num_set.add(num);
  }

  let longestStreak = 0;
  for (const num of num_set) {
    if (!num_set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (num_set.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }
  return longestStreak;
};

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
  for (let i = n - 1; i >= 0; i--) {
    if (digits[i] == 9) {
      digits[i] = 0;
    } else {
      digits[i] += 1;
      return digits;
    }
  }
  const ans = new Array(n + 1).fill(0);
  ans[0] = 1;
  return ans;
};

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
const combinationSum = function (candidates, target) {
  const ans = [];
  const dfs = (target, combine, idx) => {
    if (idx === candidates.length) {
      return;
    }
    if (target === 0) {
      ans.push(combine);
      return;
    }
    //直接跳过
    dfs(target, combine, idx + 1);
    //选择当前数
    if (target - candidates[idx] >= 0) {
      dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
    }
  };

  dfs(target, [], 0);
  return ans;
};

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
const sortColors1 = function (nums) {
  const map = {};
  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = 1;
    } else {
      map[nums[i]] += 1;
    }
  }
  const ans = [];
  for (let i = 0; i <= 2; i++) {
    let num = 1;
    while (num <= map[i]) {
      ans.push(i);
      num++;
    }
  }
  return ans;
};

//方法二：双指针
const sortColors2 = function (nums) {
  let len = nums.length;
  let p0 = 0,
    p2 = len - 1;
  for (let i = 0; i <= p2; i++) {
    while (i <= p2 && nums[i] == 2) {
      let temp = nums[i];
      nums[i] = nums[p2];
      nums[p2] = temp;
      --p2;
    }
    if (nums[i] == 0) {
      let temp = nums[i];
      nums[i] = nums[p0];
      nums[p0] = temp;
      ++p0;
    }
  }
};

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
  while (position > 0) {
    for (let i = 0; i < position; i++) {
      if (i + nums[i] >= position) {
        position = i;
        steps++;
        break;
      }
    }
  }
  return steps;
};

// 方法二：正向查找可到达的最大位置
const jump2 = (nums) => {
  let len = nums.length;
  let end = 0;
  let maxPosition = 0;
  let steps = 0;
  for (let i = 0; i < len - 1; i++) {
    maxPosition = Math.max(maxPosition, i + nums[i]);
    if (i === end) {
      end = maxPosition;
      steps++;
    }
  }
  return steps;
};

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
  for (let num of nums) {
    single ^= num;
  }
  return single;
};
// const nums = [2,2,1];
// const nums = [4,1,2,1,2];
// console.log('2:', singleNumber(nums));

//13. 多数元素(leetcode 169)
// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
const majorityElement = (nums) => {
  let len = nums.length;
  let map = {};
  for (let num of nums) {
    if (!map[num]) {
      map[num] = 1;
    } else {
      map[num] += 1;
    }
  }

  for (let key in map) {
    if (map[key] > len / 2) {
      return Number(key);
    }
  }
};
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
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
    } else if (prices[i] - minPrice > maxPrice) {
      maxPrice = prices[i] - minPrice;
    }
  }
  return maxPrice;
};
// const prices = [7,1,5,3,6,4];
// const prices = [7,6,4,3,1];
// const prices = [2,4,1];
// console.log('maxProfit:', maxProfit(prices));

//15. 杨辉三角(leetcode 118)
// 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。
const generate = (numRows) => {
  const ret = [];
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < row.length - 1; j++) {
      row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
    }
    ret.push(row);
  }
  return ret;
};
// console.log('generate:', generate(1));

//16. 杨辉三角 II(leetcode 119)
// 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。在「杨辉三角」中，每个数是它左上方和右上方的数的和。
const getRow = (rowIndex) => {
  const ret = [];
  for (let i = 0; i <= rowIndex; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < row.length - 1; j++) {
      row[j] = ret[i - 1][j - 1] + ret[i - 1][j];
    }
    ret.push(row);
  }
  return ret[rowIndex];
};
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
  for (let i = 1; i < prices.length; i++) {
    ans += Math.max(0, prices[i] - prices[i - 1]);
  }
  return ans;
};

//方法二：动态规划
const maxProfit3 = (prices) => {
  let dp0 = 0,
    dp1 = -prices[0];
  for (let i = 1; i < prices.length; i++) {
    let newDp0 = Math.max(dp0, dp1 + prices[i]);
    let newDp1 = Math.max(dp1, dp0 - prices[i]);
    dp0 = newDp0;
    dp1 = newDp1;
  }
  return dp0;
};

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
    if (cur === nums.length) {
      ans.push(t.slice());
      return;
    }
    t.push(nums[cur]);
    dfs(cur + 1, nums);
    t.pop(t.length - 1);
    dfs(cur + 1, nums);
  };
  dfs(0, nums);
  return ans;
};

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
  if (n === 0) return;
  const m = board[0].length;

  const dfs = (board, x, y) => {
    if (x < 0 || x >= n || y < 0 || y >= m || board[x][y] !== "O") {
      return;
    }
    board[x][y] = "A";
    dfs(board, x - 1, y);
    dfs(board, x + 1, y);
    dfs(board, x, y - 1);
    dfs(board, x, y + 1);
  };

  for (let i = 0; i < n; i++) {
    dfs(board, i, 0);
    dfs(board, i, m - 1);
  }
  for (let j = 1; j < m - 1; j++) {
    dfs(board, 0, j);
    dfs(board, n - 1, j);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "A") {
        board[i][j] = "O";
      } else if (board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }
  return board;
};

// const board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]];
// const board = [["X"]];
// console.log('solve:', solve(board));

//20. 只出现一次的数字 II(leetcode 137)
// 给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。
const singleNumber1 = (nums) => {
  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  let ans = 0;
  console.log("freq.entries():", freq.entries());
  for (const [num, occ] of freq.entries()) {
    if (occ === 1) {
      ans = num;
      break;
    }
  }
  return ans;
};
// const nums = [2,2,3,2];
// const nums = [0,1,0,1,0,1,99];
// console.log('singleNumber1:', singleNumber1(nums));

//21.存在重复元素(leetcode 217)
// 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；如果数组中每个元素互不相同，返回 false 。
const containsDuplicate = (nums) => {
  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }
  return false;
};
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
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  const amount = nums.reduce((occ, num) => occ + num, 0);
  return sum - amount;
};

//方法二：排序
const missingNumber2 = (nums) => {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  for (let i = 0; i <= n; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }
  return n;
};

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
  for (let i = 0; i < n; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    }
    map.set(nums[i], i);
  }
  return [];
};
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
  for (let first = 0; first < n; first++) {
    // 需要和上一次枚举的数不相同
    if (first > 0 && nums[first] === nums[first - 1]) {
      continue;
    }
    // c 对应的指针初始指向数组的最右端
    let third = n - 1;
    const target = -nums[first];
    for (let second = first + 1; second < n; second++) {
      // 需要和上一次枚举的数不相同
      if (second > first + 1 && nums[second] === nums[second - 1]) {
        continue;
      }
      // 需要保证 b 的指针在 c 的指针的左侧
      while (second < third && nums[second] + nums[third] > target) {
        --third;
      }
      // 如果指针重合，随着 b 后续的增加
      // 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
      if (second === third) {
        break;
      }
      if (nums[second] + nums[third] === target) {
        ans.push([nums[first], nums[second], nums[third]]);
      }
    }
  }
  return ans;
};
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
  for (let i = 0; i < n; i++) {
    // 保证和上一次枚举的元素不相等
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    // 使用双指针枚举 b 和 c
    let j = i + 1,
      k = n - 1;
    while (j < k) {
      let sum = nums[i] + nums[j] + nums[k];
      // 如果和为 target 直接返回答案
      if (sum === target) {
        return target;
      }
      // 根据差值的绝对值来更新答案
      if (Math.abs(sum - target) < Math.abs(best - target)) {
        best = sum;
      }
      if (sum > target) {
        // 如果和大于 target，移动 c 对应的指针
        let k0 = k - 1;
        // 移动到下一个不相等的元素
        while (j < k0 && nums[k0] === nums[k]) {
          --k0;
        }
        k = k0;
      } else {
        // 如果和小于 target，移动 b 对应的指针
        let j0 = j + 1;
        // 移动到下一个不相等的元素
        while (j0 < k && nums[j0] === nums[j]) {
          ++j0;
        }
        j = j0;
      }
    }
  }
  return best;
};

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
  const subboxs = new Array(9)
    .fill(0)
    .map(() => new Array(9).fill(0).map(() => new Array(9).fill(0)));
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const c = board[i][j];
      if (c !== ".") {
        const index = c.charCodeAt() - "0".charCodeAt() - 1;
        rows[i][index]++;
        columns[j][index]++;
        subboxs[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
        if (
          rows[i][index] > 1 ||
          columns[j][index] > 1 ||
          subboxs[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1
        ) {
          return false;
        }
      }
    }
  }
  return true;
};
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
  if (grid == null || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }
  const rows = grid.length,
    columns = grid[0].length;
  const dp = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
  dp[0][0] = grid[0][0];
  for (let i = 1; i < rows; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  for (let j = 1; j < columns; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  return dp[rows - 1][columns - 1];
};

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
  for (let i = 0; i < n; i++) {
    if (i <= rightMost) {
      rightMost = Math.max(rightMost, i + nums[i]);
      if (rightMost >= n - 1) {
        return true;
      }
    }
  }
  return false;
};
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
  let left = 0,
    right = 0;
  while (right < n) {
    if (nums[right] !== 0) {
      swap1(nums, left, right);
      left++;
    }
    right++;
  }
};

function swap1(nums, left, right) {
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
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (map.has(num) && Math.abs(i - map.get(num) <= k)) {
      return true;
    }
    map.set(num, i);
  }
  return false;
};
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
  while (i < n) {
    const low = i;
    i++;
    while (i < n && nums[i] === nums[i - 1] + 1) {
      i++;
    }
    const high = i - 1;
    const temp = ["" + nums[low]];
    if (low < high) {
      temp.push("->");
      temp.push(nums[high]);
    }
    ans.push(temp.join(""));
  }
  return ans;
};

// const nums = [0,1,2,4,5,7];
// const nums = [0,2,3,4,6,8,9];
// console.log('summaryRanges:', summaryRanges(nums));

// 32. 子集 II(leetcode 90)
// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。
// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。
const subsetsWithDup = (nums) => {
  nums.sort((a, b) => a - b);
  let t = [],
    ans = [];
  const dfs = (choosePre, cur, nums) => {
    if (cur === nums.length) {
      ans.push(t.slice());
      return;
    }
    dfs(false, cur + 1, nums);
    if (!choosePre && cur > 0 && nums[cur - 1] === nums[cur]) {
      return;
    }
    t.push(nums[cur]);
    dfs(true, cur + 1, nums);
    t = t.slice(0, t.length - 1);
  };
  dfs(false, 0, nums);
  return ans;
};

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
  for (let i = 1; i < n; i++) {
    f[i][0] = f[i - 1][0] + triangle[i][0];
    for (let j = 1; j < i; j++) {
      f[i][j] = Math.min(f[i - 1][j - 1], f[i - 1][j]) + triangle[i][j];
    }
    f[i][i] = f[i - 1][i - 1] + triangle[i][i];
  }
  let minTotal = f[n - 1][0];
  for (let i = 1; i < n; i++) {
    minTotal = Math.min(minTotal, f[n - 1][i]);
  }
  return minTotal;
};

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
const NumArray = function (nums) {
  const n = nums.length;
  this.nums = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    this.nums[i + 1] = this.nums[i] + nums[i];
  }
};
NumArray.prototype.sumRange = function (left, right) {
  return this.nums[right + 1] - this.nums[left];
};

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
  let maxF = nums[0],
    minF = nums[0],
    ans = nums[0];
  for (let i = 1; i < nums.length; i++) {
    let mx = maxF,
      mn = minF;
    maxF = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
    minF = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
    ans = Math.max(ans, maxF);
  }
  return ans;
};

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
  let low = 0,
    high = numbers.length - 1;
  while (low < high) {
    const sum = numbers[low] + numbers[high];
    if (sum === target) {
      return [low + 1, high + 1];
    } else if (sum < target) {
      low++;
    } else {
      high--;
    }
  }
  return [-1, -1];
};

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
};

const set_intersection = (set1, set2) => {
  if (set1.size > set2.size) {
    return set_intersection(set2, set1);
  }
  const intersection = new Set();
  for (const num of set1) {
    if (set2.has(num)) {
      intersection.add(num);
    }
  }
  return [...intersection];
};

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
  while (low < high) {
    const pivot = low + Math.floor((high - low) / 2);
    if (nums[pivot] < nums[high]) {
      high = pivot;
    } else {
      low = pivot + 1;
    }
  }
  return nums[low];
};

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
  let left = 0,
    right = n - 1,
    ans = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (compare(nums, mid - 1, mid) < 0 && compare(nums, mid, mid + 1) > 0) {
      ans = mid;
      break;
    }
    if (compare(nums, mid, mid + 1) < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return ans;
};

const get = (nums, idx) => {
  if (idx === -1 || idx === nums.length) {
    return [0, 0];
  }
  return [1, nums[idx]];
};

const compare = (nums, idx1, idx2) => {
  const num1 = get(nums, idx1);
  const num2 = get(nums, idx2);
  if (num1[0] !== num2[0]) {
    return num1[0] > num2[0] ? 1 : -1;
  }
  if (num1[1] === num2[2]) {
    return 0;
  }
  return num1[1] > num2[1] ? 1 : -1;
};

// const nums = [1,2,3,1];
// const nums = [1,2,1,3,5,6,4];
// console.log('findPeakElement:', findPeakElement(nums));

// 40. 轮转数组(leetcode 189)
// 给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
const rotate1 = (nums, k) => {
  let i = 1;
  while (i <= k) {
    const val = nums.pop();
    nums.unshift(val);
    i++;
  }
  return nums;
};

// 方法二：数组翻转
const reverse1 = (nums, start, end) => {
  while (start <= end) {
    const temp = nums[end];
    nums[end] = nums[start];
    nums[start] = temp;
    start++;
    end--;
  }
};

const rotate2 = (nums, k) => {
  const n = nums.length;
  k = k % n;
  reverse1(nums, 0, n - 1);
  reverse1(nums, 0, k - 1);
  reverse1(nums, k, n - 1);
  return nums;
};

// 方法三：使用额外的数组
const rotate3 = (nums, k) => {
  const n = nums.length;
  const newArr = new Array(n);
  for (let i = 0; i < n; i++) {
    newArr[(i + k) % n] = nums[i];
  }
  for (let i = 0; i < n; i++) {
    nums[i] = newArr[i];
  }
  return nums;
};

// const nums = [1,2,3,4,5,6,7], k = 3;
// const nums = [-1,-100,3,99], k = 2;
// console.log('rotate:', rotate3(nums, k));

// 41. 第三大的数(leetcode 414)
// 给你一个非空数组，返回此数组中 第三大的数 。如果不存在，则返回数组中最大的数。
const thirdMax1 = (nums) => {
  nums.sort((a, b) => b - a);
  for (let i = 1, diff = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1] && ++diff === 3) {
      return nums[i];
    }
  }
  return nums[0];
};

const thirdMax2 = (nums) => {
  let first = -Number.MAX_VALUE,
    second = -Number.MAX_VALUE,
    third = -Number.MAX_VALUE;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > first) {
      third = second;
      second = first;
      first = nums[i];
    } else if (nums[i] > second && nums[i] < first) {
      third = second;
      second = nums[i];
    } else if (nums[i] > third && nums[i] < second) {
      third = nums[i];
    }
  }
  return third === -Number.MAX_VALUE ? first : third;
};

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
  for (let i = 1; i <= n; i++) {
    if (!set.has(i)) {
      ans.push(i);
    }
  }
  return ans;
};

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
  for (const num of nums) {
    res += num - minNum;
  }
  return res;
};

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
  const gLen = g.length,
    sLen = s.length;
  let count = 0;
  for (let i = 0, j = 0; i < gLen && j < sLen; i++, j++) {
    while (j < sLen && g[i] > s[j]) {
      j++;
    }
    if (j < sLen) {
      count++;
    }
  }
  return count;
};
// const g = [1,2,3], s = [1,1];
// const g = [1,2], s = [1,2,3];
// const g = [10,9,8,7], s = [5,6,7,8];
// console.log('findContentChildren:', findContentChildren(g, s));

// 45. 打家劫舍(leetcode 198)
// 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
// 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
// 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
const rob = (nums) => {
  if (nums == null || nums.length === 0) {
    return 0;
  }
  if (nums.length === 1) {
    return nums[0];
  }
  const n = nums.length;
  let first = nums[0],
    second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < n; i++) {
    const temp = second;
    second = Math.max(first + nums[i], second);
    first = temp;
  }
  return second;
};

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
  for (const num of nums) {
    if (set.has(num)) {
      return num;
    }
    set.add(num);
  }
  return -1;
};

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
  if (grid == null || grid.length === 0) {
    return 0;
  }
  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  const dfs = (grid, row, col) => {
    if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === "0") {
      return;
    }
    grid[row][col] = "0";
    dfs(grid, row - 1, col);
    dfs(grid, row + 1, col);
    dfs(grid, row, col - 1);
    dfs(grid, row, col + 1);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(grid, i, j);
      }
    }
  }
  return count;
};

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
  for (let i = 2; i < n; i++) {
    ans += isPrime(i);
  }
  return ans;
};

const isPrime = (x) => {
  for (let i = 2; i * i <= x; i++) {
    if (x % i === 0) {
      return false;
    }
  }
  return true;
};

// 方法二：埃氏筛
/**
 * 我们考虑这样一个事实：如果 xx 是质数，那么大于 x 的 x 的倍数 2x,3x,… 一定不是质数，因此我们可以从这里入手。
 * 我们设 isPrime[i] 表示数 i 是不是质数，如果是质数则为 1，否则为 0。从小到大遍历每个数，如果这个数为质数，
 * 则将其所有的倍数都标记为合数（除了该质数本身），即 0，这样在运行结束的时候我们即能知道质数的个数。
 */
const countPrimes2 = (n) => {
  const isPrimes = new Array(n).fill(1);
  let ans = 0;
  for (let i = 2; i < n; i++) {
    if (isPrimes[i]) {
      ans++;
      for (let j = i * i; j < n; j += i) {
        isPrimes[j] = 0;
      }
    }
  }
  return ans;
};

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
  const n = grid.length,
    m = grid[0].length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j]) {
        let cnt = 0;
        for (let k = 0; k < 4; ++k) {
          let tx = i + dx[k];
          let ty = j + dy[k];
          if (tx < 0 || tx >= n || ty < 0 || ty >= m || !grid[tx][ty]) {
            cnt += 1;
          }
        }
        ans += cnt;
      }
    }
  }
  return ans;
};

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
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      if (sum >= target) {
        ans = Math.min(ans, j - i + 1);
        break;
      }
    }
  }
  return ans === Number.MAX_VALUE ? 0 : ans;
};

// 方法二：滑动窗口
/**
 * 定义两个指针 start 和 end 分别表示子数组（滑动窗口窗口）的开始位置和结束位置，维护变量sum 存储子数组中的元素和（即从 nums[start] 到 nums[end] 的元素和）。
 * 初始状态下，start 和 end 都指向下标 0，sum 的值为 0。
 * 每一轮迭代，将 nums[end] 加到 sum，如果 sum≥s，则更新子数组的最小长度（此时子数组的长度是 end−start+1），然后将 nums[start] 从 sum 中减去并将 start 右移，
 * 直到 sum<s，在此过程中同样更新子数组的最小长度。在每一轮迭代的最后，将 end 右移。
 */
const minSubArrayLen2 = (target, nums) => {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }
  let ans = Number.MAX_VALUE;
  let sum = 0;
  let start = 0,
    end = 0;
  while (end < n) {
    sum += nums[end];
    while (sum >= target) {
      ans = Math.min(ans, end - start + 1);
      sum -= nums[start];
      start++;
    }
    end++;
  }
  return ans === Number.MAX_VALUE ? 0 : ans;
};

// const target = 7, nums = [2,3,1,2,4,3];
// const target = 4, nums = [1,4,4];
// const target = 11, nums = [1,1,1,1,1,1,1,1];
// console.log('minSubArrayLen:', minSubArrayLen2(target, nums));

// 51. 最大连续 1 的个数(leetcode 485)
// 给定一个二进制数组 nums ， 计算其中最大连续 1 的个数。
const findMaxConsecutiveOnes = (nums) => {
  const n = nums.length;
  let ans = 0,
    i = 0;
  while (i < n) {
    let num = 0;
    while (nums[i] === 1) {
      num++;
      i++;
    }
    ans = Math.max(ans, num);
    while (nums[i] === 0) {
      i++;
    }
  }
  return ans;
};

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
  for (let i = 0; i < timeSeries.length; i++) {
    for (let j = timeSeries[i]; j < timeSeries[i] + duration; j++) {
      ans.add(j);
    }
  }
  return [...ans].length;
};

const findPoisonedDuration2 = (timeSeries, duration) => {
  let ans = 0;
  let expired = 0;
  for (let i = 0; i < timeSeries.length; i++) {
    if (timeSeries[i] >= expired) {
      ans += duration;
    } else {
      ans += timeSeries[i] + duration - expired;
    }
    expired = timeSeries[i] + duration;
  }
  return ans;
};
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
    if (q === index) {
      return nums[q];
    } else {
      return q < index
        ? quickSelect(nums, q + 1, r, index)
        : quickSelect(nums, l, q - 1, index);
    }
  };

  const randomPartition = (nums, l, r) => {
    let i = Math.floor(Math.random() * (r - l + 1)) + l;
    swap(nums, i, r);
    return partition(nums, l, r);
  };

  const partition = (nums, l, r) => {
    let x = nums[r],
      i = l - 1;
    for (let j = l; j < r; j++) {
      if (nums[j] <= x) {
        swap(nums, ++i, j);
      }
    }
    swap(nums, i + 1, r);
    return i + 1;
  };

  const swap = (nums, l, r) => {
    const temp = nums[l];
    nums[l] = nums[r];
    nums[r] = temp;
  };

  return quickSelect(nums, 0, nums.length - 1, nums.length - k);
};

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
  if (len === 1) {
    return nums[0];
  } else if (len === 2) {
    return Math.max(nums[0], nums[1]);
  }
  return Math.max(robRange(nums, 0, len - 2), robRange(nums, 1, len - 1));
};

const robRange = (nums, start, end) => {
  let first = nums[start],
    second = Math.max(nums[start], nums[start + 1]);
  for (let i = start + 2; i <= end; i++) {
    const temp = second;
    second = Math.max(first + nums[i], second);
    first = temp;
  }
  return second;
};

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
    for (let i = 0; i < 9; i++) {
      if ((1 << i) & mask) {
        temp.push(i + 1);
      }
    }
    return temp.length === k && temp.reduce((prev, val) => val + prev, 0) === n;
  };

  for (let mask = 0; mask < 1 << 9; mask++) {
    if (check(mask, k, n)) {
      ans.push(temp);
    }
  }
  return ans;
};

// 方法二：组合枚举
const combinationSum32 = (k, n) => {
  const res = [];
  const temp = [];
  const dfs = (cur, n, k, sum, res) => {
    if (temp.length + (n - cur + 1) < k || temp.length > k) {
      return;
    }
    if (
      temp.length === k &&
      temp.reduce((prev, val) => prev + val, 0) === sum
    ) {
      res.push(temp.slice());
      return;
    }
    temp.push(cur);
    dfs(cur + 1, n, k, sum, res);
    temp.pop();
    dfs(cur + 1, n, k, sum, res);
  };

  dfs(1, 9, k, n, res);
  return res;
};

// const k = 3, n = 7;
// const k = 3, n = 9;
// console.log('combinationSum3:', combinationSum32(k, n));

// 56. 存在重复元素 III(leetcode 220)
// 给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。
// 如果存在则返回 true，不存在返回 false。
const containsNearbyAlmostDuplicate1 = (nums, k, t) => {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (Math.abs(nums[i] - nums[j]) <= t && Math.abs(i - j) <= k && i !== j) {
        return true;
      }
    }
  }
  return false;
};

// 方法二：桶
const containsNearbyAlmostDuplicate2 = (nums, k, t) => {
  const n = nums.length;
  const mp = new Map();
  for (let i = 0; i < n; i++) {
    const x = nums[i];
    const id = getID(x, t + 1);
    if (mp.has(id)) {
      return true;
    }
    if (mp.has(id - 1) && Math.abs(x - mp.get(id - 1)) <= t) {
      return true;
    }
    if (mp.has(id + 1) && Math.abs(x - mp.get(id + 1)) <= t) {
      return true;
    }
    mp.set(id, x);
    if (i >= k) {
      mp.delete(getID(nums[i - k], t + 1));
    }
  }
  return false;
};

const getID = (x, w) => {
  return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w);
};

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
  for (const num of candidates) {
    const len = freq.length;
    if (len === 0 || num !== freq[len - 1][0]) {
      freq.push([num, 1]);
    } else {
      ++freq[len - 1][1];
    }
  }
  console.log("freq:", freq);
  const dfs = (pos, rest) => {
    if (rest === 0) {
      ans.push(sequence);
      return;
    }
    if (pos === freq.length || rest < freq[pos][0]) {
      return;
    }
    dfs(pos + 1, rest);
    const most = Math.min(Math.floor(rest / freq[pos][0]), freq[pos][1]);
    for (let i = 1; i <= most; i++) {
      sequence.push(freq[pos][0]);
      dfs(pos + 1, rest - i * freq[pos][0]);
    }
    for (let i = 1; i <= most; i++) {
      sequence.pop();
    }
  };

  dfs(0, target);
  return ans;
};

// const candidates = [10,1,2,7,6,1,5], target = 8;
// console.log('combinationSum2:', combinationSum2(candidates, target));

// 58. 多数元素 II(leetcode 229)
// 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。
const majorityElement2 = (nums) => {
  const ans = [];
  const n = nums.length;
  const map = new Map();
  for (const num of nums) {
    if (!map[num]) {
      map[num] = 1;
    } else {
      ++map[num];
    }
  }
  for (const key in map) {
    if (map[key] > n / 3) {
      ans.push(Number(key));
    }
  }
  return ans;
};
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
  for (let i = 1; i < n; i++) {
    L[i] = nums[i - 1] * L[i - 1];
  }

  // R[i] 为索引 i 右侧所有元素的乘积
  // 对于索引为 'length-1' 的元素，因为右侧没有元素，所以 R[length-1] = 1
  R[n - 1] = 1;
  for (let i = n - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1];
  }

  // 对于索引 i，除 nums[i] 之外其余各元素的乘积就是左侧所有元素的乘积乘以右侧所有元素的乘积
  for (let i = 0; i < n; i++) {
    answer[i] = L[i] * R[i];
  }
  return answer;
};

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
  for (let i = 1; i < n; i++) {
    answer[i] = nums[i - 1] * answer[i - 1];
  }

  let R = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] = answer[i] * R;
    R *= nums[i];
  }
  return answer;
};

// const nums = [1,2,3,4];
// const nums = [-1,1,0,-3,3];
// console.log('productExceptSelf:', productExceptSelf2(nums));

// 60. 最大正方形(leetcode 221)
// 在一个由 '0' 和 '1' 组成的二维矩阵内，找到只包含 '1' 的最大正方形，并返回其面积。
// 方法一：动态规划
// 状态转移方程：dp(i,j) = min(dp(i−1, j), dp(i−1, j−1), dp(i, j−1)) + 1
const maximalSquare = (matrix) => {
  let maxSide = 0;
  const row = matrix.length,
    column = matrix[0].length;
  const dp = new Array(row).fill(0).map(() => new Array(column).fill(0));
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < column; j++) {
      if (matrix[i][j] === "1") {
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1], dp[i][j - 1]) + 1;
        }
      }
      maxSide = Math.max(maxSide, dp[i][j]);
    }
  }
  return maxSide * maxSide;
};
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
  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
    while (q[0] <= i - k) {
      q.shift();
    }
    ans.push(nums[q[0]]);
  }
  return ans;
};

// const nums = [1,3,-1,-3,5,3,6,7], k = 3;
// const nums = [1], k = 1;
// console.log('maxSlidingWindow:', maxSlidingWindow(nums, k));

// 62. 接雨水(leetcode 42)
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
// 方法一：动态规划
/**
 * 思路：
 * 创建两个长度为 n 的数组 leftMax 和 rightMax。对于 0≤i<n，leftMax[i] 表示下标 i 及其左边的位置中，height 的最大高度，
 * rightMax[i] 表示下标 i 及其右边的位置中，height 的最大高度。
 * 显然，leftMax[0]=height[0]，rightMax[n−1]=height[n−1]。两个数组的其余元素的计算如下：
 * - 当 1≤i≤n−1 时，leftMax[i] = max(leftMax[i−1], height[i])；
 * - 当 0≤i≤n−2 时，rightMax[i] = max(rightMax[i+1], height[i])。
 * 因此可以正向遍历数组 height 得到数组 leftMax 的每个元素值，反向遍历数组 height 得到数组 rightMax 的每个元素值。
 * 在得到数组 leftMax 和 rightMax 的每个元素值之后，对于 0≤i<n，下标 i 处能接的雨水量等于 min(leftMax[i], rightMax[i]) − height[i]。
 * 遍历每个下标位置即可得到能接的雨水总量。
 */
const trap1 = (height) => {
  const n = height.length;
  if (n === 0) {
    return 0;
  }

  const leftMax = new Array(n).fill(0);
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  const rightMax = new Array(n).fill(0);
  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return ans;
};

// 方法二：单调栈
/**
 * 思路：
 * 维护一个单调栈，单调栈存储的是下标，满足从栈底到栈顶的下标对应的数组 height 中的元素递减。
 * 从左到右遍历数组，遍历到下标 i 时，如果栈内至少有两个元素，记栈顶元素为 top，top 的下面一个元素是 left，
 * 则一定有 height[left] ≥ height[top]。如果 height[i] > height[top]，则得到一个可以接雨水的区域，
 * 该区域的宽度是 i−left−1，高度是 min(height[left], height[i]) − height[top]，根据宽度和高度即可计算得到该区域能接的雨水量。
 */
const trap2 = (height) => {
  let ans = 0;
  const stack = [];
  const n = height.length;
  for (let i = 0; i < n; i++) {
    while (stack.length && height[i] > height[stack[stack.length - 1]]) {
      const top = stack.pop();
      if (!stack.length) {
        break;
      }
      const left = stack[stack.length - 1];
      const curWidth = i - left - 1;
      const curHeight = Math.min(height[left], height[i]) - height[top];
      ans += curWidth * curHeight;
    }
    stack.push(i);
  }
  return ans;
};

// 方法三：双指针
/**
 * 思路：
 * 维护两个指针 left 和 right，以及两个变量 leftMax 和 rightMax，初始时 left = 0, right = n − 1, leftMax = 0, rightMax = 0。
 * 指针 left 只会向右移动，指针 right 只会向左移动，在移动指针的过程中维护两个变量 leftMax 和 rightMax 的值。
 * 当两个指针没有相遇时，进行如下操作：
 * - 使用 height[left] 和 height[right] 的值更新 leftMax 和 rightMax 的值；
 * - 如果 height[left] < height[right]，则必有 leftMax < rightMax，下标 left 处能接的雨水量等于 leftMax − height[left]，
 * 将下标 left 处能接的雨水量加到能接的雨水总量，然后将 left 加 1（即向右移动一位）；
 * - 如果 height[left] ≥ height[right]，则必有 leftMax ≥ rightMax，下标 right 处能接的雨水量等于 rightMax − height[right]，
 * 将下标 right 处能接的雨水量加到能接的雨水总量，然后将 right 减 1（即向左移动一位）。
 * 当两个指针相遇时，即可得到能接的雨水总量。
 */
const trap3 = (height) => {
  let ans = 0;
  let left = 0,
    right = height.length - 1;
  let leftMax = 0,
    rightMax = 0;
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);
    if (height[left] < height[right]) {
      ans += leftMax - height[left];
      left++;
    } else {
      ans += rightMax - height[right];
      right--;
    }
  }
  return ans;
};

// const height = [0,1,0,2,1,0,1,3,2,1,2,1];
// const height = [4,2,0,3,2,5];
// console.log('trap:', trap3(height));

// 63. 分发糖果(leetcode 135)
/**
 * n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。
 * 你需要按照以下要求，给这些孩子分发糖果：
 * - 每个孩子至少分配到 1 个糖果。
 * - 相邻两个孩子评分更高的孩子会获得更多的糖果。
 * 请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。
 */
// 方法一：两次遍历
/**
 * 我们可以将「相邻的孩子中，评分高的孩子必须获得更多的糖果」这句话拆分为两个规则，分别处理。
 * - 左规则：当 ratings[i − 1] < ratings[i] 时，i 号学生的糖果数量将比 i − 1 号孩子的糖果数量多。
 * - 右规则：当 ratings[i] > ratings[i + 1] 时，i 号学生的糖果数量将比 i + 1 号孩子的糖果数量多。
 * 我们遍历该数组两次，处理出每一个学生分别满足左规则或右规则时，最少需要被分得的糖果数量。每个人最终分得的糖果数量即为这两个数量的最大值。
 */
const candy = (ratings) => {
  const n = ratings.length;
  const left = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (i > 0 && ratings[i] > ratings[i - 1]) {
      left[i] = left[i - 1] + 1;
    } else {
      left[i] = 1;
    }
  }

  let right = 0,
    ret = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (i < n - 1 && ratings[i] > ratings[i + 1]) {
      right++;
    } else {
      right = 1;
    }
    ret += Math.max(left[i], right);
  }
  return ret;
};

// const ratings = [1,0,2];
// const ratings = [1,2,2];
// const ratings = [1,2,3];
// console.log('candy:', candy(ratings));

// 64. 搜索二维矩阵 II(leetcode 240)
/**
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
 * - 每行的元素从左到右升序排列。
 * - 每列的元素从上到下升序排列。
 */
// 方法一：Z 字形查找
/**
 * 我们可以从矩阵 matrix 的右上角 (0,n−1) 进行搜索。在每一步的搜索过程中，如果我们位于位置 (x,y)，那么我们希望在以 matrix 的左下角
 * 为左下角、以 (x,y) 为右上角的矩阵中进行搜索，即行的范围为 [x,m−1]，列的范围为 [0,y]：
 * - 如果 matrix[x,y] = target，说明搜索完成；
 * - 如果 matrix[x,y] > target，由于每一列的元素都是升序排列的，那么在当前的搜索矩阵中，所有位于第 y 列的元素都是严格大于 target 的，
 * 因此我们可以将它们全部忽略，即将 y 减少 1；
 * - 如果 matrix[x,y] < target，由于每一行的元素都是升序排列的，那么在当前的搜索矩阵中，所有位于第 x 行的元素都是严格小于 target 的，
 * 因此我们可以将它们全部忽略，即将 x 增加 1。
 * 在搜索的过程中，如果我们超出了矩阵的边界，那么说明矩阵中不存在 \textit{target}target。
 */
const searchMatrix1 = (matrix, target) => {
  const m = matrix.length,
    n = matrix[0].length;
  let x = 0,
    y = n - 1;
  while (x < m && y >= 0) {
    if (matrix[x][y] === target) {
      return true;
    }
    if (matrix[x][y] > target) {
      y--;
    } else {
      x++;
    }
  }
  return false;
};

// 方法二：二分查找
const searchMatrix2 = (matrix, target) => {
  for (const row of matrix) {
    const index = search(row, target);
    if (index >= 0) {
      return true;
    }
  }
  return false;
};

const search = (nums, target) => {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};

// const matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5;
// const matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20;
// console.log('searchMatrix:', searchMatrix2(matrix, target));

// 65. 搜索旋转排序数组 II(leetcode 81)
/**
 * 已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转 ，
 * 使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
 * 例如， [0,1,2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4] 。
 * 给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。
 * 如果 nums 中存在这个目标值 target ，则返回 true ，否则返回 false 。
 * 你必须尽可能减少整个操作步骤。
 */
// 方法一：二分查找
const search3 = (nums, target) => {
  const n = nums.length;
  if (n === 0) {
    return false;
  }
  if (n === 1) {
    return nums[0] === target;
  }
  let l = 0,
    r = n - 1;
  while (l <= r) {
    const mid = Math.floor((r - l) / 2) + l;
    if (nums[mid] === target) {
      return true;
    }
    if (nums[l] === nums[mid] && nums[mid] === nums[r]) {
      l++;
      r--;
    } else if (nums[l] <= nums[mid]) {
      if (nums[l] <= target && target < nums[mid]) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[n - 1]) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
  }
  return false;
};

// const nums = [2,5,6,0,0,1,2], target = 0;
// const nums = [2,5,6,0,0,1,2], target = 3;
// console.log('search3:', search3(nums, target));

// 66. 只出现一次的数字 III(leetcode 260)
// 给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。
// 进阶：你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？
const singleNumber2 = (nums) => {
  const map = new Map();
  for (const num of nums) {
    if (!map.has(num)) {
      map.set(num, 1);
    } else {
      map.set(num, map.get(num) + 1);
    }
  }

  const ans = [];
  for (const [key, value] of map) {
    if (value === 1) {
      ans.push(key);
    }
  }
  return ans;
};
// const nums = [1,2,1,3,2,5];
// const nums = [-1,0];
// const nums = [0,1];
// console.log('singleNumber2:', singleNumber2(nums));

// 67. 全排列(leetcode 46)
// 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
const permute = (nums) => {
  const res = [],
    path = [];
  const used = new Array(nums.length).fill(false);
  const dfs = () => {
    if (path.length === nums.length) {
      res.push(path.slice());
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      path.push(nums[i]);
      used[i] = true;
      dfs();
      path.pop();
      used[i] = false;
    }
  };

  dfs();
  return res;
};

// const nums = [1,2,3];
// const nums = [0,1];
// const nums = [1];
// console.log('permute:', permute(nums));

// 68. 全排列 II(leetcode 47)
// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
// 方法一：搜索回溯
// 思路：要解决重复问题，我们只要设定一个规则，保证在填第 idx 个数的时候重复数字只会被填入一次即可。而在本题解中，
// 我们选择对原数组排序，保证相同的数字都相邻，然后每次填入的数一定是这个数所在重复数集合中「从左往右第一个未被填过的数字」
const permuteUnique = (nums) => {
  const n = nums.length;
  const res = [];
  const vis = new Array(n).fill(false);
  const dfs = (idx, perm) => {
    if (idx === n) {
      res.push(perm.slice());
      return;
    }
    for (let i = 0; i < n; i++) {
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }
      perm.push(nums[i]);
      vis[i] = true;
      dfs(idx + 1, perm);
      vis[i] = false;
      perm.pop();
    }
  };
  nums.sort((a, b) => a - b);
  dfs(0, []);
  return res;
};

// const nums = [1,1,2];
// console.log('permuteUnique:', permuteUnique(nums));

// 69. 旋转图像(leetcode 48)
// 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
// 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
const rotate = (matrix) => {
  const n = matrix.length;
  // 水平翻转
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j],
      ];
    }
  }
  // 主对角线翻转
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  return matrix;
};

// const matrix = [[1,2,3],[4,5,6],[7,8,9]];
// const matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
// console.log('rotate:', rotate(matrix));

// 70. 搜索二维矩阵(leetcode 74)
// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
// - 每行中的整数从左到右按升序排列。
// - 每行的第一个整数大于前一行的最后一个整数。
// 方法一：两次二分查找
const searchMatrix3 = (matrix, target) => {
  const binarySearchFirstColumn = (matrix, target) => {
    let low = -1,
      high = matrix.length - 1;
    while (low < high) {
      const mid = Math.floor((high - low + 1) / 2) + low;
      if (matrix[mid][0] <= target) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    return low;
  };

  const binarySearchRow = (row, target) => {
    let low = 0,
      high = row.length - 1;
    while (low <= high) {
      const mid = Math.floor((high - low) / 2) + low;
      if (row[mid] === target) {
        return true;
      } else if (row[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return false;
  };

  const rowIndex = binarySearchFirstColumn(matrix, target);
  if (rowIndex < 0) {
    return false;
  }
  return binarySearchRow(matrix[rowIndex], target);
};

// 方法二：一次二分查找
const searchMatrix4 = (matrix, target) => {
  const m = matrix.length,
    n = matrix[0].length;
  let low = 0,
    high = m * n - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    if (matrix[Math.floor(mid / n)][mid % n] === target) {
      return true;
    } else if (matrix[Math.floor(mid / n)][mid % n] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return false;
};

// const matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3;
// const matrix = [[1]], target = 1;
// const matrix = [[1,3]], target = 3;
// console.log('searchMatrix:', searchMatrix4(matrix, target));

// 72. 字母异位词分组(leetcode 49)
// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
// 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
const groupAnagrams = (strs) => {
  const map = new Map();
  for (const str of strs) {
    let array = Array.from(str);
    array.sort();
    const key = array.toString();
    const list = map.get(key) ? map.get(key) : [];
    list.push(str);
    map.set(key, list);
  }
  return Array.from(map.values());
};

// const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
// console.log('groupAnagrams:', groupAnagrams(strs));

// 73. 螺旋矩阵(leetcode 54)
// 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
// 方法一：模拟
const spiralOrder1 = (matrix) => {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }
  const rows = matrix.length,
    columns = matrix[0].length;
  const visited = new Array(rows)
    .fill(0)
    .map(() => new Array(columns).fill(false));
  const total = rows * columns;
  const order = new Array(total).fill(0);

  let directionIndex = 0,
    row = 0,
    column = 0;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  for (let i = 0; i < total; i++) {
    order[i] = matrix[row][column];
    visited[row][column] = true;
    const nextRow = row + directions[directionIndex][0],
      nextColumn = column + directions[directionIndex][1];
    if (
      !(
        nextRow >= 0 &&
        nextRow < rows &&
        nextColumn >= 0 &&
        nextColumn < columns &&
        !visited[nextRow][nextColumn]
      )
    ) {
      directionIndex = (directionIndex + 1) % 4;
    }
    row += directions[directionIndex][0];
    column += directions[directionIndex][1];
  }
  return order;
};

// 方法二：按层模拟
const spiralOrder2 = (matrix) => {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }
  const rows = matrix.length,
    columns = matrix[0].length;
  const order = [];
  let left = 0,
    right = columns - 1,
    top = 0,
    bottom = rows - 1;
  while (left <= right && top <= bottom) {
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }
    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }
    if (left < right && top < bottom) {
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column]);
      }
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left]);
      }
    }
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }
  return order;
};

// const matrix = [[1,2,3],[4,5,6],[7,8,9]];
// const matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
// console.log('spiralOrder:', spiralOrder2(matrix));

// 74. 不同路径(leetcode 62)
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
// 问总共有多少条不同的路径？
// 方法一：动态规划
// 动态规划转移方程：f(i, j) = f(i−1, j) + f(i, j−1)
const uniquePaths = (m, n) => {
  const f = new Array(m).fill(0).map(() => new Array(n).fill(0));
  f[0][0] = 1;
  for (let i = 1; i < m; i++) {
    f[i][0] = 1;
  }
  for (let j = 1; j < n; j++) {
    f[0][j] = 1;
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      f[i][j] = f[i - 1][j] + f[i][j - 1];
    }
  }
  return f[m - 1][n - 1];
};

// const m = 3, n = 7;
// const m = 3, n = 2;
// const m = 7, n = 3;
// const m = 3, n = 3;
// console.log('uniquePaths:', uniquePaths(m, n));

// 75. 格雷编码(leetcode 89)
/**
 * n 位格雷码序列 是一个由 2n 个整数组成的序列，其中：
 * - 每个整数都在范围 [0, 2n - 1] 内（含 0 和 2n - 1）
 * - 第一个整数是 0
 * - 一个整数在序列中出现 不超过一次
 * - 每对 相邻 整数的二进制表示 恰好一位不同 ，且
 * - 第一个 和 最后一个 整数的二进制表示 恰好一位不同
 * 给你一个整数 n ，返回任一有效的 n 位格雷码序列 。
 */
const grayCode = (n) => {
  const ret = [0];
  for (let i = 1; i <= n; i++) {
    const m = ret.length;
    for (let j = m - 1; j >= 0; j--) {
      ret.push(ret[j] | (1 << (i - 1)));
    }
  }
  return ret;
};

// const n = 2;
// const n = 1;
// console.log('grayCode:', grayCode(n));

// 76.最低加油次数(leetcode 871)
/**
 * 汽车从起点出发驶向目的地，该目的地位于出发位置东面 target 英里处。
 * 沿途有加油站，每个 station[i] 代表一个加油站，它位于出发位置东面 station[i][0] 英里处，并且有 station[i][1] 升汽油。
 * 假设汽车油箱的容量是无限的，其中最初有 startFuel 升燃料。它每行驶 1 英里就会用掉 1 升汽油。
 * 当汽车到达加油站时，它可能停下来加油，将所有汽油从加油站转移到汽车中。
 * 为了到达目的地，汽车所必要的最低加油次数是多少？如果无法到达目的地，则返回 -1 。
 * 注意：如果汽车到达加油站时剩余燃料为 0，它仍然可以在那里加油。如果汽车到达目的地时剩余燃料为 0，仍然认为它已经到达目的地。
 */
const minRefuelStops = (target, startFuel, stations) => {
  const pq = [];
  let ans = 0,
    prev = 0,
    fuel = startFuel;
  const n = stations.length;
  for (let i = 0; i <= n; i++) {
    const cur = i < n ? stations[i][0] : target;
    fuel -= cur - prev;
    while (fuel < 0 && pq.length !== 0) {
      fuel += pq.shift();
      ans++;
    }
    if (fuel < 0) {
      return -1;
    }
    if (i < n) {
      pq.push(stations[i][1]);
      pq.sort((a, b) => b - a);
      prev = cur;
    }
  }
  return ans;
};

// const target = 1, startFuel = 1, stations = [];
// const target = 100, startFuel = 1, stations = [[10,100]];
// const target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]];
// const target = 100, startFuel = 50, stations = [[25,25],[50,50]];
// console.log('minRefuelStops:', minRefuelStops(target, startFuel, stations));

// 76.最小绝对差(leetcode 1200)
// 给你个整数数组 arr，其中每个元素都 不相同。
// 请你找到所有具有最小绝对差的元素对，并且按升序的顺序返回。
const minimumAbsDifference = (arr) => {
  arr.sort((a, b) => a - b);
  let res = Number.MAX_VALUE;
  const ans = [];
  for (let i = 1; i < arr.length; i++) {
    res = Math.min(res, arr[i] - arr[i - 1]);
  }
  let i = 1;
  while (i < arr.length) {
    if (arr[i] - arr[i - 1] === res) {
      ans.push([arr[i - 1], arr[i]]);
    }
    i++;
  }
  return ans;
};
// const arr = [4,2,1,3];
// const arr = [1,3,6,10,15];
// const arr = [3,8,-10,23,19,-4,-14,27];
// console.log('minimumAbsDifference:', minimumAbsDifference(arr));

// 77. 我的日程安排表 I(leetcode 729)
/**
 * 实现一个 MyCalendar 类来存放你的日程安排。如果要添加的日程安排不会造成 重复预订 ，则可以存储这个新的日程安排。、
 * 当两个日程安排有一些时间上的交叉时（例如两个日程安排都在同一时间内），就会产生 重复预订 。
 * 日程可以用一对整数 start 和 end 表示，这里的时间是半开区间，即 [start, end), 实数 x 的范围为，  start <= x < end 。
 * 实现 MyCalendar 类：
 * - MyCalendar() 初始化日历对象。
 * - boolean book(int start, int end) 如果可以将日程安排成功添加到日历中而不会导致重复预订，返回 true 。
 *   否则，返回 false 并且不要将该日程安排添加到日历中。
 */
const MyCalendar = function () {
  this.booked = [];
};

MyCalendar.prototype.book = function (start, end) {
  for (const arr of this.booked) {
    let l = arr[0],
      r = arr[1];
    if (l < end && start < r) {
      return false;
    }
  }
  this.booked.push([start, end]);
  return true;
};
// var obj = new MyCalendar()
// const arr = [[10, 20], [15, 25], [20, 30]]
// const arr = [[47,50],[33,41],[39,45],[33,42],[25,32],[26,35],[19,25],[3,8],[8,13],[18,27]]
// const arr = [[37,50],[33,50],[4,17],[35,48],[8,25]]
// const ans = [];
// for(let i = 0; i < arr.length; i++){
//     var param_1 = obj.book(arr[i][0], arr[i][1]);
//     ans.push(param_1);
// }
// console.log('ans:', ans);

// 78. 玩筹码(leetcode 1217)
/**
 * 有 n 个筹码。第 i 个筹码的位置是 position[i] 。
 * 我们需要把所有筹码移到同一个位置。在一步中，我们可以将第 i 个筹码的位置从 position[i] 改变为:
 * - position[i] + 2 或 position[i] - 2 ，此时 cost = 0
 * - position[i] + 1 或 position[i] - 1 ，此时 cost = 1
 * 返回将所有筹码移动到同一位置上所需要的 最小代价 。
 */
/**
 * 思路：
 * 首先很容易得出：
 * 从某一个偶（奇）数位置 pi 改变到另一个偶（奇）数位置 pj，不妨设 pi < pj，那么一定 ∃k∈N∗ 使得 pi + 2k = pj 成立，即此时的最小开销为 0。
 * 从某一个偶（奇）数位置 pi 改变到另一个奇（偶）数位置 pj，不妨设 pi < pj，那么一定 ∃k∈N 使得 pi + 2k + 1 = pj 成立，即此时的最小开销为 1。
 * 那么我们可以把初始每一个偶数位置的「筹码」看作一个整体，每一个奇数位置的「筹码」看作一个整体。因为我们的目标是最后将
 * 全部的「筹码」移动到同一个位置，那么最后的位置只有两种情况：
 * - 移动到某一个偶数位置，此时的开销最小值就是初始奇数位置「筹码」的数量。
 * - 移动到某一个奇数位置，此时的开销最小值就是初始偶数位置「筹码」的数量。
 * - 那么这两种情况中的最小值就是最后将所有筹码移动到同一位置上所需要的最小代价。
 */
const minCostToMoveChips = (position) => {
  let even = 0,
    odd = 0;
  for (const num of position) {
    if (num % 2 === 1) {
      even++;
    } else {
      odd++;
    }
  }
  return Math.min(even, odd);
};

// const position = [1,2,3];
// const position = [2,2,2,3,3];
// const position = [1,1000000000];
// const position = [6,4,7,8,2,10,2,7,9,7];
// console.log('minCostToMoveChips:', minCostToMoveChips(position));

// 78.最长的斐波那契子序列的长度(leetcode 873)
/**
 * 如果序列 X_1, X_2, ..., X_n 满足下列条件，就说它是 斐波那契式 的：
 * - n >= 3
 * - 对于所有 i + 2 <= n，都有 X_i + X_{i+1} = X_{i+2}
 * 给定一个严格递增的正整数数组形成序列 arr ，找到 arr 中最长的斐波那契式的子序列的长度。如果一个不存在，返回  0 。
 * （回想一下，子序列是从原序列 arr 中派生出来的，它从 arr 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。
 * 例如， [3, 5, 8] 是 [3, 4, 5, 6, 7, 8] 的一个子序列）
 */
// 方法一：动态规划
const lenLongestFibSubseq = (arr) => {
  const indices = new Map();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    indices.set(arr[i], i);
  }

  const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (arr[j] * 2 <= arr[i]) {
        break;
      }
      if (indices.has(arr[i] - arr[j])) {
        const k = indices.get(arr[i] - arr[j]);
        dp[j][i] = Math.max(dp[k][j] + 1, 3);
        ans = Math.max(ans, dp[j][i]);
      }
    }
  }
  return ans;
};

// const arr = [1,2,3,4,5,6,7,8];
// const arr = [1,3,7,11,12,14,18];
// console.log('lenLongestFibSubseq:', lenLongestFibSubseq(arr));

// 79.摘樱桃(leetcode 741)
/**
 * 一个N x N的网格(grid) 代表了一块樱桃地，每个格子由以下三种数字的一种来表示：
 * - 0 表示这个格子是空的，所以你可以穿过它。
 * - 1 表示这个格子里装着一个樱桃，你可以摘到樱桃然后穿过它。
 * - -1 表示这个格子里有荆棘，挡着你的路。
 * 你的任务是在遵守下列规则的情况下，尽可能的摘到最多樱桃：
 * - 从位置 (0, 0) 出发，最后到达 (N-1, N-1) ，只能向下或向右走，并且只能穿越有效的格子（即只可以穿过值为0或者1的格子）；
 * - 当到达 (N-1, N-1) 后，你要继续走，直到返回到 (0, 0) ，只能向上或向左走，并且只能穿越有效的格子；
 * - 当你经过一个格子且这个格子包含一个樱桃时，你将摘到樱桃并且这个格子会变成空的（值变为0）；
 * - 如果在 (0, 0) 和 (N-1, N-1) 之间不存在一条可经过的路径，则没有任何一个樱桃能被摘到。
 */
const cherryPickup = (grid) => {
  const n = grid.length;
  const f = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill(-Number.MAX_VALUE));
  f[0][0] = grid[0][0];
  for (let k = 1; k < n * 2 - 1; k++) {
    for (let x1 = Math.min(k, n - 1); x1 >= Math.max(k - n + 1, 0); --x1) {
      for (let x2 = Math.min(k, n - 1); x2 >= x1; --x2) {
        const y1 = k - x1,
          y2 = k - x2;
        if (grid[x1][y1] === -1 || grid[x2][y2] === -1) {
          f[x1][x2] = -Number.MAX_VALUE;
          continue;
        }
        let res = f[x1][x2];
        if (x1 > 0) {
          res = Math.max(res, f[x1 - 1][x2]);
        }
        if (x2 > 0) {
          res = Math.max(res, f[x1][x2 - 1]);
        }
        if (x1 > 0 && x2 > 0) {
          res = Math.max(res, f[x1 - 1][x2 - 1]);
        }
        res += grid[x1][y1];
        if (x2 !== x1) {
          res += grid[x2][y2];
        }
        f[x1][x2] = res;
      }
    }
  }
  return Math.max(f[n - 1][n - 1], 0);
};

// const grid = [[0, 1, -1], [1, 0, -1], [1, 1,  1]];
// console.log('cherryPickup:', cherryPickup(grid));

// 79.实现一个魔法字典(leetcode 676)
/**
 * 设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 如果给出一个单词，
 * 请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于你构建的字典中。
 * 实现 MagicDictionary 类：
 * - MagicDictionary() 初始化对象
 * - void buildDict(String[] dictionary) 使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
 * - bool search(String searchWord) 给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，
 *   使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。
 */
var MagicDictionary = function () {};

MagicDictionary.prototype.buildDict = function (dictionary) {
  this.words = dictionary;
};

MagicDictionary.prototype.search = function (searchWord) {
  for (const word of this.words) {
    if (word.length !== searchWord.length) {
      continue;
    }
    let diff = 0;
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== searchWord[i]) {
        diff++;
        if (diff > 1) {
          break;
        }
      }
    }
    if (diff === 1) {
      return true;
    }
  }
  return false;
};

// var obj = new MagicDictionary()
// obj.buildDict(dictionary)
// var param_2 = obj.search(searchWord)

// 80. 奇数值单元格的数目(leetcode 1252)
/**
 * 给你一个 m x n 的矩阵，最开始的时候，每个单元格中的值都是 0。
 * 另有一个二维索引数组 indices，indices[i] = [ri, ci] 指向矩阵中的某个位置，其中 ri 和 ci 分别表示指定的行和列（从 0 开始编号）。
 * 对 indices[i] 所指向的每个位置，应同时执行下述增量操作：
 * - ri 行上的所有单元格，加 1 。
 * - ci 列上的所有单元格，加 1 。
 * 给你 m、n 和 indices 。请你在执行完所有 indices 指定的增量操作后，返回矩阵中 奇数值单元格 的数目。
 */
// 方法一：直接模拟
const oddCells1 = (m, n, indices) => {
  const arr = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (let i = 0; i < indices.length; i++) {
    const indice = indices[i];

    for (let j = 0; j < n; j++) {
      arr[indice[0]][j] += 1;
    }

    for (let k = 0; k < m; k++) {
      arr[k][indice[1]] += 1;
    }
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] % 2 === 1) {
        res++;
      }
    }
  }
  return res;
};

// 方法二：模拟空间优化
const oddCells2 = (m, n, indices) => {
  const rows = new Array(m).fill(0);
  const cols = new Array(n).fill(0);

  for (const index of indices) {
    rows[index[0]]++;
    cols[index[1]]++;
  }

  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if ((rows[i] + cols[j]) % 2 === 1) {
        res++;
      }
    }
  }
  return res;
};

// const m = 2, n = 3, indices = [[0,1],[1,1]];
// const m = 2, n = 2, indices = [[1,1],[0,0]];
// console.log('oddCells:', oddCells2(m, n, indices));

// 81. 行星碰撞(leetcode 735)
/**
 * 给定一个整数数组 asteroids，表示在同一行的行星。
 * 对于数组中的每一个元素，其绝对值表示行星的大小，正负表示行星的移动方向（正表示向右移动，负表示向左移动）。每一颗行星以相同的速度移动。
 * 找出碰撞后剩下的所有行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，
 * 则两颗行星都会爆炸。两颗移动方向相同的行星，永远不会发生碰撞。
 */
const asteroidCollision = (asteroids) => {
  const stack = [];
  for (const aster of asteroids) {
    let alive = true;
    while (
      alive &&
      aster < 0 &&
      stack.length > 0 &&
      stack[stack.length - 1] > 0
    ) {
      alive = stack[stack.length - 1] < -aster;
      if (stack[stack.length - 1] <= -aster) {
        stack.pop();
      }
    }
    if (alive) {
      stack.push(aster);
    }
  }
  const size = stack.length;
  const ans = new Array(size).fill(0);
  for (let i = size - 1; i >= 0; i--) {
    ans[i] = stack.pop();
  }
  return ans;
};

// const asteroids = [5,10,-5];
// const asteroids = [8,-8];
// const asteroids = [10,2,-5];
// const asteroids = [-10,-2,5];
// console.log('asteroidCollision:', asteroidCollision(asteroids));

// 82. 前缀和后缀搜索(leetcode 745)
/**
 * 设计一个包含一些单词的特殊词典，并能够通过前缀和后缀来检索单词。
 * 实现 WordFilter 类：
 * - WordFilter(string[] words) 使用词典中的单词 words 初始化对象。
 * f(string pref, string suff) 返回词典中具有前缀 prefix 和后缀 suff 的单词的下标。
 * 如果存在不止一个满足要求的下标，返回其中 最大的下标 。如果不存在这样的单词，返回 -1 。
 */
// 方法一：计算每个单词的前缀后缀组合可能性
const WordFilter = function (words) {
  this.dictionary = new Map();
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const m = word.length;
    for (let prefixLen = 1; prefixLen <= m; prefixLen++) {
      for (let suffLen = 1; suffLen <= m; suffLen++) {
        this.dictionary.set(
          word.substring(0, prefixLen) + "#" + word.substring(m - suffLen),
          i
        );
      }
    }
  }
};

WordFilter.prototype.f = function (pref, suff) {
  if (this.dictionary.has(pref + "#" + suff)) {
    return this.dictionary.get(pref + "#" + suff);
  }
  return -1;
};

// 83. 数组嵌套(leetcode 565)
// 索引从0开始长度为N的数组A，包含0到N - 1的所有整数。找到最大的集合S并返回其大小，
// 其中 S[i] = {A[i], A[A[i]], A[A[A[i]]], ... }且遵守以下的规则。
// 假设选择索引为i的元素A[i]为S的第一个元素，S的下一个元素应该是A[A[i]]，之后是A[A[A[i]]]... 以此类推，
// 不断添加直到S出现重复的元素。
const arrayNesting = (nums) => {
  const n = nums.length;
  let ans = 0;
  const vis = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let cnt = 0;
    while (!vis[i]) {
      vis[i] = true;
      i = nums[i];
      cnt++;
    }
    ans = Math.max(ans, cnt);
  }
  return ans;
};

// const A = [5,4,0,3,1,6,2];
// console.log('arrayNesting:', arrayNesting(A));

// 84. 隔离病毒(leetcode 749)
/**
 * 病毒扩散得很快，现在你的任务是尽可能地通过安装防火墙来隔离病毒。
 * 假设世界由 m x n 的二维矩阵 isInfected 组成， isInfected[i][j] == 0 表示该区域未感染病毒，而  isInfected[i][j] == 1
 * 表示该区域已感染病毒。可以在任意 2 个相邻单元之间的共享边界上安装一个防火墙（并且只有一个防火墙）。
 * 每天晚上，病毒会从被感染区域向相邻未感染区域扩散，除非被防火墙隔离。现由于资源有限，每天你只能安装一系列防火墙来隔离其中一
 * 个被病毒感染的区域（一个区域或连续的一片区域），且该感染区域对未感染区域的威胁最大且 保证唯一 。
 * 你需要努力使得最后有部分区域不被病毒感染，如果可以成功，那么返回需要使用的防火墙个数; 如果无法实现，则返回在世界被病毒全部
 * 感染时已安装的防火墙个数。
 */
const containVirus = (isInfected) => {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const m = isInfected.length,
    n = isInfected[0].length;
  let ans = 0;
  while (true) {
    const neighbors = [];
    const firewalls = [];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (isInfected[i][j] === 1) {
          const queue = [];
          queue.push([i, j]);
          const neighbor = new Set();
          let firewall = 0,
            idx = neighbors.length + 1;
          isInfected[i][j] = -idx;

          while (queue.length > 0) {
            const arr = queue.shift();
            let x = arr[0],
              y = arr[1];
            for (let d = 0; d < 4; d++) {
              let nx = x + dirs[d][0],
                ny = y + dirs[d][1];
              if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                if (isInfected[nx][ny] === 1) {
                  queue.push([nx, ny]);
                  isInfected[nx][ny] = -idx;
                } else if (isInfected[nx][ny] === 0) {
                  ++firewall;
                  neighbor.add(getHash(nx, ny));
                }
              }
            }
          }
          neighbors.push(neighbor);
          firewalls.push(firewall);
        }
      }
    }

    if (neighbors.length === 0) {
      break;
    }

    let idx = 0;
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].size > neighbors[idx].size) {
        idx = i;
      }
    }

    ans += firewalls[idx];
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (isInfected[i][j] < 0) {
          if (isInfected[i][j] !== -idx - 1) {
            isInfected[i][j] = 1;
          } else {
            isInfected[i][j] = 2;
          }
        }
      }
    }

    for (let i = 0; i < neighbors.length; i++) {
      if (i !== idx) {
        for (const val of neighbors[i]) {
          let x = val >> 16,
            y = val & ((1 << 16) - 1);
          isInfected[x][y] = 1;
        }
      }
    }
    if (neighbors.length === 1) {
      break;
    }
  }
  return ans;
};

const getHash = (x, y) => {
  return (x << 16) ^ y;
};

// const isInfected = [[0,1,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]];
// const isInfected = [[1,1,1],[1,0,1],[1,1,1]];
// const isInfected = [[1,1,1,0,0,0,0,0,0],[1,0,1,0,1,1,1,1,1],[1,1,1,0,0,0,0,0,0]];
// console.log('containVirus:', containVirus(isInfected));

// 85. 我的日程安排表 II(leetcode 731)
/**
 * 实现一个 MyCalendar 类来存放你的日程安排。如果要添加的时间内不会导致三重预订时，则可以存储这个新的日程安排。
 * MyCalendar 有一个 book(int start, int end)方法。它意味着在 start 到 end 时间内增加一个日程安排，注意，
 * 这里的时间是半开区间，即 [start, end), 实数 x 的范围为，  start <= x < end。
 * 当三个日程安排有一些时间上的交叉时（例如三个日程安排都在同一时间内），就会产生三重预订。
 * 每次调用 MyCalendar.book方法时，如果可以将日程安排成功添加到日历中而不会导致三重预订，返回 true。否则，返回 false
 * 并且不要将该日程安排添加到日历中。
 * 请按照以下步骤调用MyCalendar 类: MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)
 */
const MyCalendarTwo = function () {
  this.booked = [];
  this.overlaps = [];
};

MyCalendarTwo.prototype.book = function (start, end) {
  for (const arr of this.overlaps) {
    let l = arr[0],
      r = arr[1];
    if (start < r && end > l) {
      return false;
    }
  }

  for (const arr of this.booked) {
    const l = arr[0],
      r = arr[1];
    if (start < r && end > l) {
      this.overlaps.push([Math.max(l, start), Math.min(r, end)]);
    }
  }

  this.booked.push([start, end]);
  return true;
};

// const obj = new MyCalendarTwo()
// const param_1 = obj.book(10, 20)
// const param_2 = obj.book(50, 60)
// const param_3 = obj.book(10, 40)
// const param_4 = obj.book(5, 15)
// const param_5 = obj.book(5, 10)
// const param_6 = obj.book(25, 55)
// console.log('param:', param_1, param_2, param_3, param_4, param_5, param_6);


// 86. 二维网格迁移(leetcode 1260)
/**
 * 给你一个 m 行 n 列的二维网格 grid 和一个整数 k。你需要将 grid 迁移 k 次。
 * 每次「迁移」操作将会引发下述活动：
 * - 位于 grid[i][j] 的元素将会移动到 grid[i][j + 1]。
 * - 位于 grid[i][n - 1] 的元素将会移动到 grid[i + 1][0]。
 * - 位于 grid[m - 1][n - 1] 的元素将会移动到 grid[0][0]。
 * 请你返回 k 次迁移操作后最终得到的 二维网格。
 */
const shiftGrid = (grid, k) => {
  const m = grid.length,
    n = grid[0].length;
  const ret = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const index = (i * n + j + k) % (m * n);
      ret[Math.floor(index / n)].splice(index % n, 1, grid[i][j]);
    }
  }
  return ret;
};

// const grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1;
// const grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4;
// const grid = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ],
//   k = 9;
// console.log("shiftGrid:", shiftGrid(grid, k));


// 87. 设置交集大小至少为2(leetcode 757)
/**
 * 一个整数区间 [a, b]  ( a < b ) 代表着从 a 到 b 的所有连续整数，包括 a 和 b。
 * 给你一组整数区间intervals，请找到一个最小的集合 S，使得 S 里的元素与区间intervals中的每一个整数区间都至少有2个元素相交。
 * 输出这个最小集合S的大小。
*/
// 方法一：贪心
const intersectionSizeTwo = (intervals) => {
  const n = intervals.length;
  let res = 0;
  const m = 2;
  intervals.sort((a, b) => {
    if(a[0] === b[0]){
      return b[1] - a[1];
    }
    return a[0] - b[0];
  })

  const temp = new Array(n).fill(0);
  for(let i = 0; i < n; i++){
    temp[i] = [];
  }

  const help = (intervals, temp, pos, num) => {
    for(let i = pos; i >= 0; i--){
      if(intervals[i][1] < num){
        break;
      }
      temp[i].push(num);
    }
  }
  
  for(let i = n - 1; i >= 0; i--){
    for(let j = intervals[i][0], k = temp[i].length; k < m; k++, j++){
      res++;
      help(intervals, temp, i - 1, j);
    }
  }
  return res;
}



// const intervals = [[1, 3], [1, 4], [2, 5], [3, 5]];
// const intervals = [[1, 2], [2, 3], [2, 4], [4, 5]];
// console.log('intersectionSizeTwo:', intersectionSizeTwo(intervals));


// 88. 重建序列(剑指 Offer II 115)
/**
 * 给定一个长度为 n 的整数数组 nums ，其中 nums 是范围为 [1，n] 的整数的排列。
 * 还提供了一个 2D 整数数组 sequences ，其中 sequences[i] 是 nums 的子序列。
 * 检查 nums 是否是唯一的最短 超序列 。最短 超序列 是 长度最短 的序列，并且所有序列 sequences[i] 都是它的子序列。
 * 对于给定的数组 sequences ，可能存在多个有效的 超序列 。
 * - 例如，对于 sequences = [[1,2],[1,3]] ，有两个最短的 超序列 ，[1,2,3] 和 [1,3,2] 。
 * - 而对于 sequences = [[1,2],[1,3],[1,2,3]] ，唯一可能的最短 超序列 是 [1,2,3] 。[1,2,3,4] 
 *   是可能的超序列，但不是最短的。
 * 如果 nums 是序列的唯一最短 超序列 ，则返回 true ，否则返回 false 。
 * 子序列 是一个可以通过从另一个序列中删除一些元素或不删除任何元素，而不改变其余元素的顺序的序列。
*/
const sequenceReconstruction = (nums, sequences) => {
    const n = nums.length;
    const indegrees = new Array(n + 1).fill(0);
    const graph = new Array(n + 1).fill(0).map(() => new Set());
    for(const sequence of sequences){
        const size = sequence.length;
        for(let i = 1; i < size; i++) {
            const prev = sequence[i - 1], next = sequence[i];
            if(graph[prev].add(next)){
                indegrees[next]++;
            }
        }
    }
    const queue = [];
    for(let i = 1; i <= n; i++){
        if(indegrees[i] === 0){
            queue.push(i);
        }
    }
    while(queue.length){
        if(queue.length > 1){
            return false;
        }
        const num = queue.shift();
        const set = graph[num];
        for(const next of set){
            indegrees[next]--;
            if(indegrees[next] === 0){
                queue.push(next);
            }
        }
    }
    return true;
}

// const nums = [1,2,3], sequences = [[1,2],[1,3]];
// const nums = [1,2,3], sequences = [[1,2]];
// const nums = [1,2,3], sequences = [[1,2],[1,3],[2,3]];
// console.log('sequenceReconstruction:', sequenceReconstruction(nums, sequences));


// 89. 公交站间的距离(leetcode 1184)
/**
 * 环形公交路线上有 n 个站，按次序从 0 到 n - 1 进行编号。我们已知每一对相邻公交站之间的距离，distance[i] 
 * 表示编号为 i 的车站和编号为 (i + 1) % n 的车站之间的距离。
 * 环线上的公交车都可以按顺时针和逆时针的方向行驶。
 * 返回乘客从出发点 start 到目的地 destination 之间的最短距离。
*/
const distanceBetweenBusStops = (distance, start, destination) => {
    if(start > destination){
        const temp = start;
        start = destination;
        destination = temp;
    }
    let sum1 = 0, sum2 = 0;
    for(let i = 0; i < distance.length; i++){
        if(i >= start && i < destination){
            sum1 += distance[i];
        }else{
            sum2 += distance[i];
        }
    }
    return Math.min(sum1, sum2);
}

// const distance = [1,2,3,4], start = 0, destination = 1;
// const distance = [1,2,3,4], start = 0, destination = 2;
// const distance = [1,2,3,4], start = 0, destination = 3;
// const distance = [8,11,6,7,10,11,2], start = 0, destination = 3;
// console.log('distanceBetweenBusStops:', distanceBetweenBusStops(distance, start, destination));


// 90. 设计跳表(leetcode 1206)
/**
 * 不使用任何库函数，设计一个 跳表 。
 * 跳表 是在 O(log(n)) 时间内完成增加、删除、搜索操作的数据结构。跳表相比于树堆与红黑树，
 * 其功能与性能相当，并且跳表的代码长度相较下更短，其设计思想与链表相似。
 * 跳表中有很多层，每一层是一个短的链表。在第一层的作用下，增加、删除和搜索操作的时间复杂度不超过 O(n)。
 * 跳表的每一个操作的平均时间复杂度是 O(log(n))，空间复杂度是 O(n)。
 * 了解更多 : https://en.wikipedia.org/wiki/Skip_list
 * 在本题中，你的设计应该要包含这些函数：
 * - bool search(int target) : 返回target是否存在于跳表中。
 * - void add(int num): 插入一个元素到跳表。
 * - bool erase(int num): 在跳表中删除一个值，如果 num 不存在，直接返回false. 如果存在多个 num ，删除其中任意一个即可。
 * 注意，跳表中可能存在多个相同的值，你的代码需要处理这种情况。
*/

const MAX_LEVEL = 32;
const P_FACTOR = 0.25;
const Skiplist = function(){
  this.head = new SkiplistNode(-1, MAX_LEVEL);
  this.level = 0;
}

Skiplist.prototype.search = function(target){
  let curr = this.head;
  for(let i = this.level - 1; i >= 0; i--){
    /* 找到第 i 层小于且最接近 target 的元素*/
    while(curr.forward[i] && curr.forward[i].val < target){
      curr = curr.forward[i];
    }
  }
  curr = curr.forward[0];
  /* 检测当前元素的值是否等于 target */
  if(curr && curr.val === target){
    return true;
  }
  return false;
}

Skiplist.prototype.add = function(num){
  const update = new Array(MAX_LEVEL).fill(this.head);
  let curr = this.head;
  for(let i = this.level - 1; i >= 0; i--){
    while(curr.forward[i] && curr.forward[i].val < num){
      curr = curr.forward[i];
    }
    update[i] = curr;
  }
  const lv = randomLevel();
  this.level = Math.max(this.level, lv);
  const newNode = new SkiplistNode(num, lv);
  for(let i = 0; i < lv; i++){
    /* 对第 i 层的状态进行更新，将当前元素的 forward 指向新的节点 */
    newNode.forward[i] = update[i].forward[i];
    update[i].forward[i] = newNode;
  }
}

Skiplist.prototype.erase = function(num){
  const update = new Array(MAX_LEVEL).fill(0);
  let curr = this.head;
  for(let i = this.level - 1; i >= 0; i--){
    while(curr.forward[i] && curr.forward[i].val < num){
      curr = curr.forward[i];
    }
    update[i] = curr;
  }
  curr = curr.forward[0];
  if(!curr || curr.val !== num){
    return false;
  }
  for(let i = 0; i < this.level; i++){
    if(update[i].forward[i] !== curr){
      break;
    }
    /* 对第 i 层的状态进行更新，将 forward 指向被删除节点的下一跳 */
    update[i].forward[i] = curr.forward[i];
  }
  while(this.level > 1 && !this.head.forward[this.level - 1]){
    this.level--;
  }
  return true;
}

const randomLevel = () => {
  let lv = 1;
  while(Math.random() < P_FACTOR && lv < MAX_LEVEL){
    lv++;
  }
  return lv;
}

class SkiplistNode {
  constructor(val, maxLevel) {
    this.val = val;
    this.forward = new Array(maxLevel).fill(0);
  }
}


// 91. 滑动窗口的平均值(剑指 Offer II 041)
/**
 * 给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。
 * 实现 MovingAverage 类：
 * - MovingAverage(int size) 用窗口大小 size 初始化对象。
 * - double next(int val) 成员函数 next 每次调用的时候都会往滑动窗口增加一个整数，
 *   请计算并返回数据流中最后 size 个值的移动平均值，即滑动窗口里所有数字的平均值。
*/
const MovingAverage = function(size){
  this.queue = [];
  this.size = size;
  this.sum = 0;
}

MovingAverage.prototype.next = function(val){
    if(this.queue.length === this.size){
      this.sum -= this.queue.shift();
    }
    this.queue.push(val);
    this.sum += val;
    return this.sum / this.queue.length;
}


// 92. 数组序号转换(leetcode 1331)
/**
 * 给你一个整数数组 arr ，请你将数组中的每个元素替换为它们排序后的序号。
 * 序号代表了一个元素有多大。序号编号的规则如下：
 * - 序号从 1 开始编号。
 * - 一个元素越大，那么序号越大。如果两个元素相等，那么它们的序号相同。
 * - 每个数字的序号都应该尽可能地小。
*/
const arrayRankTransform = (arr) => {
  const n = arr.length;
  const sortedArr = new Array(n).fill(0);
  sortedArr.splice(0, n, ...arr);
  sortedArr.sort((a, b) => a - b);

  const ranks = new Map();
  const ans = new Array(n).fill(0);
  for(const num of sortedArr){
    if(!ranks.has(num)){
      ranks.set(num, ranks.size + 1);
    }
  }

  for(let i = 0; i < n; i++){
    ans[i] = ranks.get(arr[i]);
  }
  return ans;
}

// const arr = [40,10,20,30];
// const arr = [100,100,100];
// const arr = [37,12,28,9,100,56,80,5,12];
// console.log('arrayRankTransform:', arrayRankTransform(arr));


// 93. 有效的正方形(leetcode 593)
/**
 * 给定2D空间中四个点的坐标 p1, p2, p3 和 p4，如果这四个点构成一个正方形，则返回 true 。
 * 点的坐标 pi 表示为 [xi, yi] 。输入 不是 按任何顺序给出的。
 * 一个 有效的正方形 有四条等边和四个等角(90度角)。
*/
const validSquare = (p1, p2, p3, p4) => {
  if(isEqual(p1, p2)){
    return false;
  }
  if(help(p1, p2, p3, p4)){
    return true;
  }
  if(isEqual(p1, p3)){
    return false;
  }
  if(help(p1, p3, p2, p4)){
    return true;
  }
  if(isEqual(p1, p4)){
    return false;
  }
  if(help(p1, p4, p2, p3)){
    return true;
  }
  return false;
}

const help = (p1, p2, p3, p4) => {
  const v1 = [p1[0] - p2[0], p1[1] - p2[1]];
  const v2 = [p3[0] - p4[0], p3[1] - p4[1]];
  if(checkMidPoint(p1, p2, p3, p4) && checkLength(v1, v2) && calCos(v1, v2)){
    return true;
  }
  return false;
}

const calCos = (v1, v2) => {
  return (v1[0] * v2[0] + v1[1] * v2[1]) === 0;
}

const checkLength = (v1, v2) => {
  return (v1[0] * v1[0] + v1[1] * v1[1]) === (v2[0] * v2[0] + v2[1] * v2[1]);
}

const checkMidPoint = (p1, p2, p3, p4) => {
  return (p1[0] + p2[0]) === (p3[0] + p4[0]) && (p1[1] + p2[1]) === (p3[1] + p4[1]);
}

const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
}

// const p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1];
// const p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12];
// const p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1];
// console.log('validSquare:', validSquare(p1, p2, p3, p4));
















































































































