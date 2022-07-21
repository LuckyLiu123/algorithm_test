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
