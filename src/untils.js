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




export {
    ListNode,
    createList
}