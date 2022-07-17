// 创建链表的节点
function ListNode(val, next){
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

//创建链表
const createList = (nums) => {
    let head = new ListNode(0);
    let tail = head;
    for(let i = 0; i < nums.length; i++){
        tail.next = new ListNode(nums[i]);
        tail = tail.next;
    }
    return head.next;
}

//获取链表的长度
const getListLength = (head) => {
    let num = 0;
    while(head){
        num++;
        head = head.next;
    }
    return num;
}

const reverseLinkedList = (head) => {
    let prev = null;
    let cur = head;
    while(cur){
        const next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }
}

// 二叉树
function TreeNode (val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// 四叉树
function QTreeNode (val,isLeaf,topLeft,topRight,bottomLeft,bottomRight){
    this.val = val;
    this.isLeaf = isLeaf;
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
}



export {
    ListNode,
    createList,
    getListLength,
    reverseLinkedList,
    TreeNode,
    QTreeNode
}