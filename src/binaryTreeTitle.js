import { TreeNode } from './untils.js'

// 1. 从前序与中序遍历序列构造二叉树(leetcode 105)
// 给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
const indexMap = new Map();
const buildTree = (preorder, inorder) => {
    const n = preorder.length;
    for(let i = 0; i < n; i++){
        indexMap.set(inorder[i], i);
    }
    return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);
}

function myBuildTree(preorder, inorder, preorder_left, preorder_right, inorder_left, inorder_right){
    if(preorder_left > preorder_right){
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
    root.left = myBuildTree(preorder, inorder, preorder_left + 1, preorder_left + size_left_subtree, inorder_left, inorder_root - 1);
    // 递归构造右子树，并连接到根节点
    // 先序遍历中 [ 从 左边界 + 1 + 左子树节点数目 开始到 右边界 ] 的元素就对应了中序遍历中 [ 从 根节点 + 1 开始到 右边界] 的元素
    root.right = myBuildTree(preorder, inorder, preorder_left + size_left_subtree + 1, preorder_right, inorder_root + 1, inorder_right);
    return root;
}

const preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];
// const preorder = [-1], inorder = [-1];
console.log('buildTree:', buildTree(preorder, inorder));