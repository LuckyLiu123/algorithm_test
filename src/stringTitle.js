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
// const a = "11", b = "1";
// const a = "1010", b = "1011";
// console.log('addBinary:', addBinary(a, b));

// 2. 电话号码的字母组合(leetcode 17)
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
const letterCombinations = (digits) => {
    const combinations = [];
    if(digits.length === 0){
        return [];
    }
    const map = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    const backtrack = (combinations, map, digits, index, combination) => {
        if(index === digits.length){
            combinations.push(combination.join(''));
        }else{
            const char = digits.charAt(index);
            const leeters = map[char];
            for(let i = 0; i < leeters.length; i++){
                combination.push(leeters[i]);
                backtrack(combinations, map, digits, index + 1, combination);
                combination.pop();
            }
        }
    }

    backtrack(combinations, map, digits, 0, []);
    return combinations;
}

// const digits = "23";
// const digits = "2";
const digits = "";
console.log('letterCombinations:', letterCombinations(digits));
























































