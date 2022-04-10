import { createList } from './untils.js';


//1. 两两交换链表中的节点(leetcode 24)
// 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
// 方法一：递归
const swapPairs = function(head){
    if(head == null || head.next == null){
        return head;
    }
    let newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
}

const head = createList([1, 2, 3, 4]);
console.log('head:', head);
console.log('swapPairs:', swapPairs(head));









































