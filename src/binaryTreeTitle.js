import { TreeNode, QTreeNode } from "./untils.js";

// 1. 从前序与中序遍历序列构造二叉树(leetcode 105)
// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
const indexMap = new Map();
const buildTree = (preorder, inorder) => {
  const n = preorder.length;
  for (let i = 0; i < n; i++) {
    indexMap.set(inorder[i], i);
  }
  return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);
};

function myBuildTree(
  preorder,
  inorder,
  preorder_left,
  preorder_right,
  inorder_left,
  inorder_right
) {
  if (preorder_left > preorder_right) {
    return null;
  }
  // 前序遍历中第一个节点就是根节点
  const preorder_root = preorder_left;
  // 中序遍历中定位根节点
  const inorder_root = indexMap.get(preorder[preorder_root]);
  // 先把根节点建立出来
  const root = new TreeNode(preorder[preorder_root]);
  // 得到左子树中的节点数目
  const size_left_subtree = inorder_root - inorder_left;
  // 递归的构造左子树，并连接到根节点
  // 先序遍历中 [ 从 左边界 + 1 开始的 size_left_subtree ] 个元素就对应了中序遍历的 [ 从 左边界 开始 到 根节点 - 1 ] 的元素
  root.left = myBuildTree(
    preorder,
    inorder,
    preorder_left + 1,
    preorder_left + size_left_subtree,
    inorder_left,
    inorder_root - 1
  );
  // 递归构造右子树，并连接到根节点
  // 先序遍历中 [ 从 左边界 + 1 + 左子树节点数目 开始到 右边界 ] 的元素就对应了中序遍历中 [ 从 根节点 + 1 开始到 右边界] 的元素
  root.right = myBuildTree(
    preorder,
    inorder,
    preorder_left + size_left_subtree + 1,
    preorder_right,
    inorder_root + 1,
    inorder_right
  );
  return root;
}

// const preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];
// const preorder = [-1], inorder = [-1];
// console.log('buildTree:', buildTree(preorder, inorder));

// 2. 从中序与后序遍历序列构造二叉树(leetcode 106)
// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
const buildTree2 = (inorder, postorder) => {
  let post_idx;
  const idx_map = new Map();
  const helper = (in_left, in_right) => {
    if (in_left > in_right) {
      return null;
    }

    // 选择 post_idx 位置的元素作为当前子树根节点
    const root_val = postorder[post_idx];
    const root = new TreeNode(root_val);

    // 根据 root 所在位置分成左右两颗子树
    const index = idx_map.get(root_val);

    post_idx--;
    // 构造右子树
    root.right = helper(index + 1, in_right);
    // 构造左子树
    root.left = helper(in_left, index - 1);
    return root;
  };

  // 从后序遍历的最后一个元素开始
  post_idx = postorder.length - 1;

  // let idx = 0;
  inorder.forEach((val, idx) => {
    idx_map.set(val, idx);
  });
  return helper(0, inorder.length - 1);
};

// const inorder = [9,3,15,20,7], postorder = [9,15,7,20,3];
// const inorder = [-1], postorder = [-1];
// console.log('buildTree2:', buildTree2(inorder, postorder));

// 3. 将有序数组转换为二叉搜索树(leetcode 108)
// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
// 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
const sortedArrayToBST = (nums) => {
  const buildTree = (nums, idx_left, idx_right) => {
    if (idx_left > idx_right) {
      return null;
    }
    const idx_root = Math.floor((idx_left + idx_right) / 2);
    const root = new TreeNode(nums[idx_root]);
    root.left = buildTree(nums, idx_left, idx_root - 1);
    root.right = buildTree(nums, idx_root + 1, idx_right);
    return root;
  };
  return buildTree(nums, 0, nums.length - 1);
};

// const nums = [-10,-3,0,5,9];
// console.log('sortedArrayToBST:', sortedArrayToBST(nums));

// 4. 二叉树的中序遍历(leetcode 94)
// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
const inorderTraversal = (root) => {
  const ans = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    ans.push(root.val);
    inorder(root.right);
  };

  inorder(root);
  return ans;
};

// const root = [1,null,2,3];
// console.log('inorderTraversal:', inorderTraversal(root));

// 5. 相同的树(leetcode 100)
// 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
// 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
// 方法一：深度优先搜索
const isSameTree = (p, q) => {
  if (p === null && q === null) {
    return true;
  }
  if (p === null || q === null) {
    return false;
  }
  if (p.val !== q.val) {
    return false;
  }
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// 6. 平衡二叉树(leetcode 110)
// 给定一个二叉树，判断它是否是高度平衡的二叉树。
// 本题中，一棵高度平衡二叉树定义为：
// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。
// 方法一：自顶向下的递归
const isBalanced1 = (root) => {
  if (root == null) {
    return true;
  } else {
    return (
      Math.abs(height1(root.left) - height1(root.right)) <= 1 &&
      isBalanced(root.left) &&
      isBalanced(root.right)
    );
  }
};

const height1 = (root) => {
  if (root == null) {
    return 0;
  } else {
    return Math.max(height1(root.left), height1(root.right)) + 1;
  }
};

// 方法二：自底向上的递归
const isBalanced2 = (root) => {
  return height2(root) >= 0;
};

const height2 = (root) => {
  if (root == null) {
    return 0;
  }
  let leftHeight = height2(root.left);
  let rightHeight = height2(root.right);
  if (
    leftHeight === -1 ||
    rightHeight === -1 ||
    Math.abs(leftHeight - rightHeight) > 1
  ) {
    return -1;
  } else {
    return Math.max(leftHeight, rightHeight) + 1;
  }
};

// 7. 四叉树交集 (leetcode 558)
/**
 * 二进制矩阵中的所有元素不是 0 就是 1 。
 * 给你两个四叉树，quadTree1 和 quadTree2。其中 quadTree1 表示一个 n * n 二进制矩阵，而 quadTree2 表示另一个 n * n 二进制矩阵。
 * 请你返回一个表示 n * n 二进制矩阵的四叉树，它是 quadTree1 和 quadTree2 所表示的两个二进制矩阵进行 按位逻辑或运算 的结果。
 * 注意，当 isLeaf 为 False 时，你可以把 True 或者 False 赋值给节点，两种值都会被判题机制 接受 。
 * 四叉树数据结构中，每个内部节点只有四个子节点。此外，每个节点都有两个属性：
 * - val：储存叶子结点所代表的区域的值。1 对应 True，0 对应 False；
 * - isLeaf: 当这个节点是一个叶子结点时为 True，如果它有 4 个子节点则为 False 。
 */
const intersect = (quadTree1, quadTree2) => {
  if (quadTree1.isLeaf) {
    if (quadTree1.val) {
      return new QTreeNode(true, true);
    }
    return new QTreeNode(
      quadTree2.val,
      quadTree2.isLeaf,
      quadTree2.topLeft,
      quadTree2.topRight,
      quadTree2.bottomLeft,
      quadTree2.bottomRight
    );
  }
  if (quadTree2.isLeaf) {
    return intersect(quadTree2, quadTree1);
  }

  const o1 = intersect(quadTree1.topLeft, quadTree2.topLeft);
  const o2 = intersect(quadTree1.topRight, quadTree2.topRight);
  const o3 = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
  const o4 = intersect(quadTree1.bottomRight, quadTree2.bottomRight);

  if (
    o1.isLeaf &&
    o2.isLeaf &&
    o3.isLeaf &&
    o4.isLeaf &&
    o1.val === o2.val &&
    o1.val === o3.val &&
    o1.val === o4.val
  ) {
    return new QTreeNode(o1.val, true);
  }
  return new QTreeNode(false, false, o1, o2, o3, o4);
};

// 8. 二叉树剪枝(leetcode 814)
/**
 * 给你二叉树的根结点 root ，此外树的每个结点的值要么是 0 ，要么是 1 。
 * 返回移除了所有不包含 1 的子树的原二叉树。
 * 节点 node 的子树为 node 本身加上所有 node 的后代。
 */
const pruneTree = (root) => {
  if (!root) {
    return null;
  }
  root.left = pruneTree(root.left);
  root.right = pruneTree(root.right);
  if (!root.left && !root.right && root.val === 0) {
    return null;
  }
  return root;
};


// 9.完全二叉树插入器(leetcode 919)
/**
 * 完全二叉树 是每一层（除最后一层外）都是完全填充（即，节点数达到最大）的，并且所有的节点都尽可能地集中在左侧。
 * 设计一种算法，将一个新节点插入到一个完整的二叉树中，并在插入后保持其完整。
 * 实现 CBTInserter 类:
 * - CBTInserter(TreeNode root) 使用头节点为 root 的给定树初始化该数据结构；
 * - CBTInserter.insert(int v)  向树中插入一个值为 Node.val == val的新节点 TreeNode。使树保持完全二叉树的状态，并返回插入节点 TreeNode 的父节点的值；
 * - CBTInserter.get_root() 将返回树的头节点。
*/
const CBTInserter = (root) => {
  this.candidate = [];
  this.root = root;

  const queue = [];
  queue.push(root);

  while(queue.length){
    const node = queue.shift();
    if(node.left){
      queue.push(node.left);
    }
    if(node.right){
      queue.push(node.right);
    }
    if(!(node.left && node.right)){
      this.candidate.push(node);
    }
  }
}

CBTInserter.prototype.insert = (val) => {
  const child = new TreeNode(val);
  const node = this.candidate[0];
  const ret = node.val;
  if(!node.left){
    node.left = child;
  }else{
    node.right = child;
    this.candidate.shift();
  }
  this.candidate.push(child);
  return ret;
}

CBTInserter.prototype.get_root = () => {
  return this.root;
}


// 10. 最大层内元素和(leetcode 1161)
/**
 * 给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
 * 请返回层内元素之和 最大 的那几层（可能只有一层）的层号，并返回其中 最小 的那个。
*/
// 方法一：深度优先搜索
const maxLevelSum = (root) => {
  const sum = [];
  const dfs = (node, level) => {
    if(level === sum.length){
      sum.push(node.val);
    }else{
      sum.splice(level, 1, sum[level] + node.val);
    }
    if(node.left){
      dfs(node.left, level + 1);
    }
    if(node.right){
      dfs(node1.right, level + 1);
    }
  }
  dfs(root, 0);
  let ans = 0;
  for(let i = 0; i < sum.length; i++){
    if(sum[i] > sum[ans]){
      ans = i;
    }
  }
  return ans + 1;
}


// 11. 在二叉树中增加一行(leetcode 623)
/**
 * 给定一个二叉树的根 root 和两个整数 val 和 depth ，在给定的深度 depth 处添加一个值为 val 的节点行。
 * 注意，根节点 root 位于深度 1 。
 * 加法规则如下:
 * - 给定整数 depth，对于深度为 depth - 1 的每个非空树节点 cur ，创建两个值为 val 的树节点作为 cur 的左子树根和右子树根。
 * - cur 原来的左子树应该是新的左子树根的左子树。
 * - cur 原来的右子树应该是新的右子树根的右子树。
 * - 如果 depth == 1 意味着 depth - 1 根本没有深度，那么创建一个树节点，值 val 作为整个原始树的新根，而原始树就是新根的左子树。
*/
// 方法一：深度优先搜索
const addOneRow1 = (root, val, depth) => {
  if(!root){
    return null;
  }
  if(depth === 1){
    return new TreeNode(val, root, null);
  }
  if(depth === 2){
    root.left = new TreeNode(val, root.left, null);
    root.right = new TreeNode(val, null, root.right);
  }else{
    root.left = addOneRow(root.left, val, depth - 1);
    root.right = addOneRow(root.right, val, depth - 1);
  }
  return root;
}

// 方法二：广度优先搜索
const addOneRow2 = (root, val, depth) => {
  if(depth === 1){
    return new TreeNode(val, root, null);
  }
  let curLevel = [];
  curLevel.push(root);
  for(let i = 1; i < depth - 1; i++){
    const tmp = [];
    for(const node of curLevel){
      if(node.left){
        tmp.push(node.left);
      }
      if(node.right){
        tmp.push(node.right);
      }
    }
    curLevel = tmp;
  }
  for(const node of curLevel){
    node.left = new TreeNode(val, node.left, null);
    node.right = new TreeNode(val, null, node.right);
  }
  return root;
}


// 12. 层数最深叶子节点的和(leetcode 1302)
// 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。
// 方法一：深度优先搜索
const deepestLeavesSum1 = (root) => {
  let maxLevel = -1;
  let sum = 0;
  const dfs = (node, level) => {
    if(!node){
      return;
    }
    if(level > maxLevel){
      maxLevel = level;
      sum = node.val;
    }else if(level === maxLevel){
      sum += node.val;
    }
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
  dfs(root, 0);
  return sum;
}

// 方法二：广度优先搜索
const deepestLeavesSum2 = (root) => {
  const queue = [];
  let sum = 0;
  queue.push(root);
  while(queue.length){
    sum = 0;
    const size = queue.length;
    for(let i = 0; i < size; i++){
      const node = queue.shift();
      sum += node.val;
      if(node.left){
        queue.push(node.left);
      }
      if(node.right){
        queue.push(node.right);
      }
    }
  }
  return sum;
}

























































