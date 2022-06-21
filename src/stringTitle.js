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
// const digits = "";
// console.log('letterCombinations:', letterCombinations(digits));

// 3. 验证回文串(leetcode 125)
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
// 说明：本题中，我们将空字符串定义为有效的回文串。
const isPalindrome = (s) => {
    let left = 0, right = s.length - 1;
    const req = /[0-9a-zA-Z]/i;
    while (left < right) {
        while (left < right && !req.test(s.charAt(left))) {
            left++;
        }
        while (left < right && !req.test(s.charAt(right))) {
            right--;
        }
        if (left < right) {
            if(s.charAt(left).toLowerCase() !== s.charAt(right).toLowerCase()) {
                return false;
            }
            left++;
            right--;
        }
    }
    return true;
}

// const s = "A man, a plan, a canal: Panama";
// const s = "race a car";
// console.log('isPalindrome:', isPalindrome(s));


// 4. 括号生成(leetcode 22)
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
// 方法二：回溯法
const generateParenthesis = (n) => {
    const ans = [];

    const backtrack = (ans, cur, open, close, max) => {
        if(cur.length === max * 2){
            ans.push(cur.join(''));
        }
        if(open < max){
            cur.push('(');
            backtrack(ans, cur, open + 1, close, max);
            cur.pop();
        }
        if(close < open){
            cur.push(')');
            backtrack(ans, cur, open, close + 1, max);
            cur.pop();

        }
    }

    backtrack(ans, [], 0, 0, n);
    return ans;
}

// console.log('generateParenthesis:', generateParenthesis(5));


// 5. 外观数列(leetcode 38)
/**
 * 给定一个正整数 n ，输出外观数列的第 n 项。
 * 「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。
 * 你可以将其视作是由递归公式定义的数字字符串序列：
 * - countAndSay(1) = "1"
 * - countAndSay(n) 是对 countAndSay(n-1) 的描述，然后转换成另一个数字字符串。
 * 前五项如下：
 * 1.     1
 * 2.     11
 * 3.     21
 * 4.     1211
 * 5.     111221
 * 第一项是数字 1 
 * 描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
 * 描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
 * 描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
 * 描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
 * 
 * 要 描述 一个数字字符串，首先要将字符串分割为 最小 数量的组，每个组都由连续的最多 相同字符 组成。然后对于每个组，
 * 先描述字符的数量，然后描述字符，形成一个描述组。要将描述转换为数字字符串，先将每组中的字符数量用数字替换，再将所有描述组连接起来。
*/
const countAndSay = (n) => {
    let str = '1';
    for(let i = 2; i <= n; i++){
        let sub = [];
        let start = 0;
        let pos = 0;
        while(pos < str.length){
            while(pos < str.length && str[pos] === str[start]){
                pos++;
            }
            sub.push('' + (pos - start) + str[start]);
            start = pos;
        }
        str = sub.join('');
    }
    return str;
}

console.log('countAndSay:', countAndSay(5));











































