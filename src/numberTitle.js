//1. 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 方法一：动态规划
const climbStairs = function (n) {
  let p = 0,
    q = 0,
    r = 1;
  for (let i = 1; i <= n; i++) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};

// console.log('climbStairs:', climbStairs(5));

// 2. 质数排列(leetcode 1175)
// 请你帮忙给从 1 到 n 的数设计排列方案，使得所有的「质数」都应该被放在「质数索引」（索引从 1 开始）上；你需要返回可能的方案总数。
// 让我们一起来回顾一下「质数」：质数一定是大于 1 的，并且不能用两个小于它的正整数的乘积来表示。
// 由于答案可能会很大，所以请你返回答案 模 mod 10^9 + 7 之后的结果即可。
const numPrimeArrangements = (n) => {
  const MOD = 1000000007;
  let numPrimes = 0;

  const isPrime = (n) => {
    if (n === 1) {
      return false;
    }
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  };

  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) {
      numPrimes++;
    }
  }

  let res = 1;
  let m = n - numPrimes;
  while (numPrimes > 0) {
    res = res % MOD;
    res *= numPrimes;
    numPrimes--;
  }

  while (m > 0) {
    res = res % MOD;
    res *= m;
    m--;
  }

  return res;
};

// console.log(numPrimeArrangements(100));

// 3. 下一个更大元素 III(leetcode 556)
// 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。
// 如果不存在这样的正整数，则返回 -1 。
// 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 -1 。
const nextGreaterElement = (n) => {
  const MAX = 2147483647;
  const nums = [...("" + n)];
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  if (i < 0) {
    return -1;
  }
  let j = nums.length - 1;
  while (j >= 0 && nums[i] >= nums[j]) {
    j--;
  }
  [nums[i], nums[j]] = [nums[j], nums[i]];
  reverse(nums, i + 1);
  const ans = 0 + nums.join("");
  return ans > MAX ? -1 : ans;
};

const reverse = (nums, begin) => {
  let i = begin,
    j = nums.length - 1;
  while (i < j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
    i++;
    j--;
  }
};

// const n = 12;
const n = 21;
console.log("nextGreaterElement:", nextGreaterElement(n));
