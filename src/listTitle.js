import { ListNode, createList } from './untils.js';


//1. 两两交换链表中的节点(leetcode 24)
// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
// 方法一：递归
const swapPairs1 = function(head){
    if(head == null || head.next == null){
        return head;
    }
    let newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
}

// 方法二：通过迭代的方式实现两两交换链表中的节点。
const swapPairs2 = function(head){
    let dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while(temp.next !== null && temp.next.next !== null){
        let node1 = temp.next;
        let node2 = temp.next.next;
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }
    return dummyHead.next;
}

const head = createList([1, 2, 3, 4]);
console.log('head:', head);
console.log('swapPairs:', swapPairs2(head));









































