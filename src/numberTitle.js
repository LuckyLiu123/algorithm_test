//1. 爬楼梯
// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
// 方法一：动态规划
const climbStairs = function(n){
    let p = 0, q = 0, r = 1;
    for(let i = 1; i <= n; i++){
        p = q;
        q = r;
        r = p + q;
    }
    return r;
}

// console.log('climbStairs:', climbStairs(5));












































































