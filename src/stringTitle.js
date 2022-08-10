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
// const expression = "1/3-1/2";
// console.log('fractionAddition:', fractionAddition(expression));


// 11. Lisp 语法解析(leetcode 736)
/**
 * 给你一个类似 Lisp 语句的字符串表达式 expression，求出其计算结果。
 * 表达式语法如下所示:
 * - 表达式可以为整数，let 表达式，add 表达式，mult 表达式，或赋值的变量。表达式的结果总是一个整数。
 * - (整数可以是正整数、负整数、0)
 * - let 表达式采用 "(let v1 e1 v2 e2 ... vn en expr)" 的形式，其中 let 总是以字符串 "let"来表示，
 *   接下来会跟随一对或多对交替的变量和表达式，也就是说，第一个变量 v1被分配为表达式 e1 的值，第二个变量 v2 被
 *   分配为表达式 e2 的值，依次类推；最终 let 表达式的值为 expr表达式的值。
 * - add 表达式表示为 "(add e1 e2)" ，其中 add 总是以字符串 "add" 来表示，该表达式总是包含两个表达式 e1、e2 ，
 *   最终结果是 e1 表达式的值与 e2 表达式的值之 和 。
 * - mult 表达式表示为 "(mult e1 e2)" ，其中 mult 总是以字符串 "mult" 表示，该表达式总是包含两个表达式 e1、e2，
 *   最终结果是 e1 表达式的值与 e2 表达式的值之 积 。
 * - 在该题目中，变量名以小写字符开始，之后跟随 0 个或多个小写字符或数字。为了方便，"add" ，"let" ，"mult" 会被定义
 *   为 "关键字" ，不会用作变量名。
 * - 最后，要说一下作用域的概念。计算变量名所对应的表达式时，在计算上下文中，首先检查最内层作用域（按括号计），
 *   然后按顺序依次检查外部作用域。测试用例中每一个表达式都是合法的。有关作用域的更多详细信息，请参阅示例。
*/
const evaluate = (expression) => {
  const scope = new Map();
  let start = 0;

  const innerEvaluate = (expression) => {
    if(expression[start] !== '('){   // 非表达式，可能为：整数或变量
      if(isLowerCase(expression[start])){
        const v = parseVar(expression);  // 变量
        const n = scope.get(v).length;
        return scope.get(v)[n - 1];
      }else{
        return parseInt(expression);
      }
    }

    let ret;
    start++;
    if(expression[start] === 'l'){
      start += 4;
      const vars = [];
      while(true){
        if(!isLowerCase(expression[start])){
          ret = innerEvaluate(expression);  // let 表达式的最后一个 expr 表达式的值
          break;
        }
        const v = parseVar(expression);
        if(expression[start] === ')'){
          const n = scope.get(v).length;
          ret = scope.get(v)[n - 1];  // let 表达式的最后一个 expr 表达式的值
          break;
        }
        vars.push(v);
        start++;  // 移除空格
        const e = innerEvaluate(expression);
        if(!scope.has(v)){
          scope.set(v, []);
        }
        scope.get(v).push(e);
        start++;  // 移除空格
      }
      for(const v of vars){
        scope.get(v).pop();  // 清除当前作用域的变量
      }
    }else if(expression[start] === 'a'){  // "add" 表达式
      start += 4;  // 移除 "add "
      const e1 = innerEvaluate(expression);
      start++;  // 移除空格
      const e2 = innerEvaluate(expression);
      ret = e1 + e2;
    }else{  // "mult" 表达式
      start += 5;  // 移除 "mult "
      const e1 = innerEvaluate(expression);
      start++;  // 移除空格
      const e2 = innerEvaluate(expression);
      ret = e1 * e2;
    }
    start++;  // 移除右括号
    return ret;
  }

  const parseInt = (expression) => {
    const n = expression.length;
    let ret = 0, sign = 1;
    if(expression[start] === '-'){
      sign = -1;
      start++;
    }
    while(start < n && isDigit(expression[start])){
      ret = ret * 10 + (expression.charAt(start) - '0');
      start++;
    }
    return sign * ret;
  }

  const parseVar = (expression) => {
    const n = expression.length;
    let ret = '';
    while(start < n && expression[start] !== ' ' && expression[start] !== ')'){
      ret += expression[start];
      start++;
    }
    return ret;
  }
  
  return innerEvaluate(expression, start);
}

// const isDigit = (ch) => {
//   return parseFloat(ch).toString() === 'NaN' ? false : true;
// }

const isLowerCase = (ch) => {
  return ch >= 'a' && ch <= 'z';
}

// const expression = "(let x 2 (mult x (let x 3 y 4 (add x y))))";
// const expression = "(let x 3 x 2 x)";
// const expression = "(let x 1 y 2 x (add x y) (add x y))";
// console.log('evaluate:', evaluate(expression));


// 12. 生成每种字符都是奇数个的字符串(leetcode 1374)
/**
 * 给你一个整数 n，请你返回一个含 n 个字符的字符串，其中每种字符在该字符串中都恰好出现 奇数次 。
 * 返回的字符串必须只含小写英文字母。如果存在多个满足题目要求的字符串，则返回其中任意一个即可。
*/
const generateTheString = (n) => {
  const str = '';
  if(n % 2 === 1){
    return str + 'a'.repeat(n);
  }
  return str + 'a'.repeat(n - 1) + 'b';
}


// 13. 数组中的字符串匹配(leetcode 1408)
/**
 * 给你一个字符串数组 words ，数组中的每个字符串都可以看作是一个单词。请你按 任意 顺序返回 words 
 * 中是其他单词的子字符串的所有单词。
 * 如果你可以删除 words[j] 最左侧和/或最右侧的若干字符得到 word[i] ，那么字符串 words[i] 就是 words[j] 的一个子字符串。
*/
const stringMatching = (words) => {
  const res = [];
  for(let i = 0; i < words.length; i++) {
    for(let j = 0; j < words.length; j++) {
      if(i !== j && words[j].indexOf(words[i]) > -1){
        res.push(words[i]);
        break;
      }
    }
  }
  return res;
}

// const words = ["mass","as","hero","superhero"];
// const words = ["leetcode","et","code"];
// const words = ["blue","green","bu"];
// console.log('stringMatching:', stringMatching(words));


// 14. 特殊的二进制序列(leetcode 761)
/**
 * 特殊的二进制序列是具有以下两个性质的二进制序列：
 * - 0 的数量与 1 的数量相等。
 * - 二进制序列的每一个前缀码中 1 的数量要大于等于 0 的数量。
 * 给定一个特殊的二进制序列 S，以字符串形式表示。定义一个操作 为首先选择 S 的两个连续且非空的特殊的子串，
 * 然后将它们交换。（两个子串为连续的当且仅当第一个子串的最后一个字符恰好为第二个子串的第一个字符的前一个字符。)
 * 在任意次数的操作之后，交换后的字符串按照字典序排列的最大的结果是什么？
*/
const makeLargestSpecial = (s) => {
  if(s.length < 2){
    return s;
  }
  let cnt = 0, left = 0;
  const subs = [];
  for(let i = 0; i < s.length; i++){
    if(s[i] === '1'){
      ++cnt;
    }else{
      --cnt;
      if(cnt === 0){
        subs.push('1' + makeLargestSpecial(s.substring(left + 1, i)) + '0');
        left = i + 1;
      }
    }
  }
  subs.sort().reverse();
  return subs.join('');
}

// const S = "11011000";
// console.log('makeLargestSpecial:', makeLargestSpecial(s));


// 15. 求解方程(leetcode 640)
/**
 * 求解一个给定的方程，将x以字符串 "x=#value" 的形式返回。该方程仅包含 '+' ， '-' 操作，变量 x 和其对应系数。
 * 如果方程没有解，请返回 "No solution" 。如果方程有无限解，则返回 “Infinite solutions” 。
 * 题目保证，如果方程中只有一个解，则 'x' 的值是一个整数。
*/
const solveEquation = (equation) => {
  let factor = 0, val = 0;
  let index = 0, n = equation.length, sign1 = 1;  // 等式左边默认系数为正
  while(index < n){
    if(equation[index] === '='){
      sign1 = -1;  // 等式右边默认系数为负
      index++;
      continue;
    }

    let sign2 = sign1, number = 0;
    let valid = false;  // 记录 number 是否有效
    if(equation[index] === '-' || equation[index] === '+'){
      sign2 = (equation[index] === '-') ? -sign1 : sign1;
      index++;
    }
    while(index < n && isDigit(equation[index])){
      number = number * 10 + (equation[index].charCodeAt() - '0'.charCodeAt());
      index++;
      valid = true;
    }
    if(index < n && equation[index] === 'x'){
      factor += valid ? sign2 * number : sign2;
      index++;
    }else{
      val += sign2 * number;
    }
  }

  if(factor === 0){
    return val === 0 ? "Infinite solutions" : "No solution";
  }
  return "x=" + (-val/factor);
}

const equation = "x+5-3+x=6+x-2";
console.log('solveEquation:', solveEquation(equation));
























