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

// const preorder = [3,9,20,15,7], inorder = [9,3,15,20,7];
// const preorder = [-1], inorder = [-1];
// console.log('buildTree:', buildTree(preorder, inorder));


// 2. 从中序与后序遍历序列构造二叉树(leetcode 106)
// 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
const buildTree2 = (inorder, postorder) => {
    let post_idx;
    const idx_map = new Map();
    const helper = (in_left, in_right) => {
        if(in_left > in_right){
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
    }

    // 从后序遍历的最后一个元素开始
    post_idx = postorder.length - 1;

    // let idx = 0;
    inorder.forEach((val, idx) => {
        idx_map.set(val, idx);
    })
    return helper(0, inorder.length - 1);
}

// const inorder = [9,3,15,20,7], postorder = [9,15,7,20,3];
// const inorder = [-1], postorder = [-1];
// console.log('buildTree2:', buildTree2(inorder, postorder));


// 3. 将有序数组转换为二叉搜索树(leetcode 108)
// 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
// 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
const sortedArrayToBST = (nums) => {
    const buildTree = (nums, idx_left, idx_right) => {
        if(idx_left > idx_right){
            return null;
        }
        const idx_root = Math.floor((idx_left + idx_right) / 2);
        const root = new TreeNode(nums[idx_root]);
        root.left = buildTree(nums, idx_left, idx_root - 1);
        root.right = buildTree(nums, idx_root + 1, idx_right);
        return root;
    }
    return buildTree(nums, 0, nums.length - 1);
}

// const nums = [-10,-3,0,5,9];
// console.log('sortedArrayToBST:', sortedArrayToBST(nums));


// 4. 二叉树的中序遍历(leetcode 94)
// 给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。
const inorderTraversal = (root) => {
    const ans = [];
    const inorder = (root) => {
        if(!root){
            return;
        }
        inorder(root.left);
        ans.push(root.val);
        inorder(root.right);
    }

    inorder(root);
    return ans;
}

const root = [1,null,2,3];
console.log('inorderTraversal:', inorderTraversal(root));




















































































