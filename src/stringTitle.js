// 1. 二进制求和(leetcode 67)
// 给你两个二进制字符串，返回它们的和（用二进制表示）。输入为 非空 字符串且只包含数字 1 和 0。
const addBinary = (a, b) => {
  const ans = [];
  let n = Math.max(a.length, b.length),
    carry = 0;
  for (let i = 0; i < n; i++) {
    carry += i < a.length ? a.charAt(a.length - 1 - i) - "0" : 0;
    carry += i < b.length ? b.charAt(b.length - 1 - i) - "0" : 0;
    ans.push(carry % 2);
    carry = Math.floor(carry / 2);
  }
  if (carry > 0) {
    ans.push("1");
  }
  ans.reverse();
  return ans.join("");
};
// const a = "11", b = "1";
// const a = "1010", b = "1011";
// console.log('addBinary:', addBinary(a, b));

// 2. 电话号码的字母组合(leetcode 17)
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
const letterCombinations = (digits) => {
  const combinations = [];
  if (digits.length === 0) {
    return [];
  }
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const backtrack = (combinations, map, digits, index, combination) => {
    if (index === digits.length) {
      combinations.push(combination.join(""));
    } else {
      const char = digits.charAt(index);
      const leeters = map[char];
      for (let i = 0; i < leeters.length; i++) {
        combination.push(leeters[i]);
        backtrack(combinations, map, digits, index + 1, combination);
        combination.pop();
      }
    }
  };

  backtrack(combinations, map, digits, 0, []);
  return combinations;
};

// const digits = "23";
// const digits = "2";
// const digits = "";
// console.log('letterCombinations:', letterCombinations(digits));

// 3. 验证回文串(leetcode 125)
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
// 说明：本题中，我们将空字符串定义为有效的回文串。
const isPalindrome = (s) => {
  let left = 0,
    right = s.length - 1;
  const req = /[0-9a-zA-Z]/i;
  while (left < right) {
    while (left < right && !req.test(s.charAt(left))) {
      left++;
    }
    while (left < right && !req.test(s.charAt(right))) {
      right--;
    }
    if (left < right) {
      if (s.charAt(left).toLowerCase() !== s.charAt(right).toLowerCase()) {
        return false;
      }
      left++;
      right--;
    }
  }
  return true;
};

// const s = "A man, a plan, a canal: Panama";
// const s = "race a car";
// console.log('isPalindrome:', isPalindrome(s));

// 4. 括号生成(leetcode 22)
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
// 方法二：回溯法
const generateParenthesis = (n) => {
  const ans = [];

  const backtrack = (ans, cur, open, close, max) => {
    if (cur.length === max * 2) {
      ans.push(cur.join(""));
    }
    if (open < max) {
      cur.push("(");
      backtrack(ans, cur, open + 1, close, max);
      cur.pop();
    }
    if (close < open) {
      cur.push(")");
      backtrack(ans, cur, open, close + 1, max);
      cur.pop();
    }
  };

  backtrack(ans, [], 0, 0, n);
  return ans;
};

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
  let str = "1";
  for (let i = 2; i <= n; i++) {
    let sub = [];
    let start = 0;
    let pos = 0;
    while (pos < str.length) {
      while (pos < str.length && str[pos] === str[start]) {
        pos++;
      }
      sub.push("" + (pos - start) + str[start]);
      start = pos;
    }
    str = sub.join("");
  }
  return str;
};

// console.log('countAndSay:', countAndSay(5));

// 6. 独特的电子邮件地址(leetcode 929)
/**
 * 每个 有效电子邮件地址 都由一个 本地名 和一个 域名 组成，以 '@' 符号分隔。除小写字母之外，电子邮件地址还可以含有一个或多个 '.' 或 '+' 。
 * - 例如，在 alice@leetcode.com中， alice 是 本地名 ，而 leetcode.com 是 域名 。
 * 如果在电子邮件地址的 本地名 部分中的某些字符之间添加句点（'.'），则发往那里的邮件将会转发到本地名中没有点的同一地址。请注意，此规则 不适用于域名 。
 * - 例如，"alice.z@leetcode.com” 和 “alicez@leetcode.com” 会转发到同一电子邮件地址。
 * 如果在 本地名 中添加加号（'+'），则会忽略第一个加号后面的所有内容。这允许过滤某些电子邮件。同样，此规则 不适用于域名 。
 * - 例如 m.y+name@email.com 将转发到 my@email.com。
 * 可以同时使用这两个规则。
 * 给你一个字符串数组 emails，我们会向每个 emails[i] 发送一封电子邮件。返回实际收到邮件的不同地址数目。
 */
const numUniqueEmails = (emails) => {
  const ans = new Set();
  for (const email of emails) {
    const i = email.indexOf("@");
    let local = email.slice(0, i).split("+")[0];
    local = local.replaceAll(".", "");
    ans.add(local + email.slice(i));
  }
  return ans.size;
};

// const emails = ["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"];
// const emails = ["a@leetcode.com","b@leetcode.com","c@leetcode.com"];
// console.log('numUniqueEmails:', numUniqueEmails(emails));

// 7. TinyURL 的加密与解密(leetcode 535)
/**
 * TinyURL 是一种 URL 简化服务， 比如：当你输入一个 URL https://leetcode.com/problems/design-tinyurl 时，
 * 它将返回一个简化的URL http://tinyurl.com/4e9iAk 。请你设计一个类来加密与解密 TinyURL 。
 * 加密和解密算法如何设计和运作是没有限制的，你只需要保证一个 URL 可以被加密成一个 TinyURL ，并且这个 TinyURL 可以用解密方法恢复成原本的 URL 。
 * 实现 Solution 类：
 * - Solution() 初始化 TinyURL 系统对象。
 * - String encode(String longUrl) 返回 longUrl 对应的 TinyURL 。
 * - String decode(String shortUrl) 返回 shortUrl 原本的 URL 。题目数据保证给定的 shortUrl 是由同一个系统对象加密的。
 */
let dataBase = new Map();
let id = 0;
const encode = (longUrl) => {
  // this.dataBase = new Map();
  // this.id = 0;
  id++;
  dataBase.set(id, longUrl);
  return "http://tingurl.com/" + id;
};

const decode = (shortUrl) => {
  const index = shortUrl.lastIndexOf("/") + 1;
  const id = parseInt(shortUrl.substring(index));
  return dataBase.get(id);
};

// const url = "https://leetcode.com/problems/design-tinyurl";
// console.log('decode:', decode(encode(url)));

// 8. 为运算表达式设计优先级(leetcode 241)
// 给你一个由数字和运算符组成的字符串 expression ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。
// 生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 10^4 。
const ADDITION = -1;
const SUBTRACTION = -2;
const MULTIPLICATION = -3;

const diffWaysToCompute = (expression) => {
  const ops = [];
  for (let i = 0; i < expression.length; ) {
    if (!isDigit(expression[i])) {
      if (expression[i] === "+") {
        ops.push(ADDITION);
      } else if (expression[i] === "-") {
        ops.push(SUBTRACTION);
      } else {
        ops.push(MULTIPLICATION);
      }
      i++;
    } else {
      let t = 0;
      while (i < expression.length && isDigit(expression[i])) {
        t = t * 10 + expression[i].charCodeAt() - "0".charCodeAt();
        i++;
      }
      ops.push(t);
    }
  }

  const dp = new Array(ops.length)
    .fill(0)
    .map(() => new Array(ops.length).fill(0));
  for (let i = 0; i < ops.length; i++) {
    for (let j = 0; j < ops.length; j++) {
      dp[i][j] = [];
    }
  }

  return diffDfs(dp, 0, ops.length - 1, ops);
};

const diffDfs = (dp, l, r, ops) => {
  if (dp[l][r].length === 0) {
    if (l === r) {
      dp[l][r].push(ops[l]);
    } else {
      for (let i = l; i < r; i += 2) {
        const left = diffDfs(dp, l, i, ops);
        const right = diffDfs(dp, i + 2, r, ops);
        for (const lv of left) {
          for (const rv of right) {
            if (ops[i + 1] === ADDITION) {
              dp[l][r].push(lv + rv);
            } else if (ops[i + 1] === SUBTRACTION) {
              dp[l][r].push(lv - rv);
            } else {
              dp[l][r].push(lv * rv);
            }
          }
        }
      }
    }
  }
  return dp[l][r];
};

const isDigit = (ch) => {
  return parseFloat(ch).toString() === "NaN" ? false : true;
};

// const expression = "2-1-1";
// const expression = "2*3-4*5";
// console.log('diffWaysToCompute:', diffWaysToCompute(expression));

// 9. 单词替换(leetcode 648)
/**
 * 在英语中，我们有一个叫做 词根(root) 的概念，可以词根后面添加其他一些词组成另一个较长的单词——我们称这个词为 继承词(successor)。
 * 例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。
 * 现在，给定一个由许多词根组成的词典 dictionary 和一个用空格分隔单词形成的句子 sentence。你需要将句子中的所有继承词用词根替换掉。
 * 如果继承词有许多可以形成它的词根，则用最短的词根替换它。
 * 你需要输出替换之后的句子。
 */
const replaceWords1 = (dictionary, sentence) => {
  const arr = sentence.split(" ");
  const senArr = sentence.split(" ");
  for (let i = 0; i < arr.length; i++) {
    let res = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < dictionary.length; j++) {
      let index = arr[i].indexOf(dictionary[j]);
      if (index > -1 && index < res) {
        senArr[i] = dictionary[j];
        res = index;
      }
    }
  }
  return senArr.join(" ");
};

const replaceWords2 = (dictionary, sentence) => {
  const dictionarySet = new Set();
  for (const root of dictionary) {
    dictionarySet.add(root);
  }
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    for (let j = 0; j < word.length; j++) {
      if (dictionarySet.has(word.substring(0, 1 + j))) {
        words[i] = word.substring(0, 1 + j);
        break;
      }
    }
  }
  return words.join(" ");
};

// const dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery";
// const dictionary = ["a", "b", "c"],
//   sentence = "aadsfasf absbs bbab cadsfafs";
// console.log("replaceWords:", replaceWords2(dictionary, sentence));


// 10. 分数加减运算(leetcode 592)
/**
 * 给定一个表示分数加减运算的字符串 expression ，你需要返回一个字符串形式的计算结果。 
 * 这个结果应该是不可约分的分数，即最简分数。 如果最终结果是一个整数，例如 2，你需要将它转换成分数形式，
 * 其分母为 1。所以在上述例子中, 2 应该被转换为 2/1。
*/
const fractionAddition = (expression) => {
  let denominator = 0, numerator = 1;
  let index = 0, n = expression.length;
  while(index < n){
    let denominator1 = 0, sign = 1;
    if(expression[index] === '-' || expression[index] === '+'){
      sign = expression[index] === '-' ? -1 : 1;
      index++;
    }
    while(index < n && isDigit(expression[index])){
      denominator1 = denominator1 * 10 + expression[index].charCodeAt() - '0'.charCodeAt();
      index++;
    }
    denominator1 = denominator1 * sign;
    index++;

    let numerator1 = 0;
    while(index < n && isDigit(expression[index])){
      numerator1 = numerator1 * 10 + expression[index].charCodeAt() - '0'.charCodeAt();
      index++;
    }

    denominator = denominator * numerator1 + denominator1 * numerator;
    numerator = numerator * numerator1;
  }

  if(denominator === 0){
    return '0/1';
  }
  const g = gcb(Math.abs(denominator), numerator);  // 获取最大公约数
  return Math.floor(denominator / g) + '/' + Math.floor(numerator / g);
}

const gcb = (a, b) => {
  let remainder = a % b;
  while(remainder !== 0){
    a = b;
    b = remainder;
    remainder = a % b;
  }
  return b;
}

// const expression = "-1/2+1/2";
// const expression = "-1/2+1/2+1/3";
const expression = "1/3-1/2";
console.log('fractionAddition:', fractionAddition(expression));












































