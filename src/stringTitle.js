// 1. 二进制求和(leetcode 67)
// 给你两个二进制字符串，返回它们的和（用二进制表示）。输入为 非空 字符串且只包含数字 1 和 0。
const addBinary = (a, b) => {
    const ans = [];
    let n = Math.max(a.length, b.length), carry = 0;
    for(let i = 0; i < n; i++){
        carry += i < a.length ? (a.charAt(a.length - 1 - i) - '0') : 0;
        carry += i < b.length ? (b.charAt(b.length - 1 - i) - '0') : 0;
        ans.push(carry % 2);
        carry = Math.floor(carry / 2);
    }
    if(carry > 0){
        ans.push('1');
    }
    ans.reverse();
    return ans.join('');
}
const a = "11", b = "1";
// const a = "1010", b = "1011";
console.log('addBinary:', addBinary(a, b));


























































