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

// const head = createList([1, 2, 3, 4]);
// console.log('head:', head);
// console.log('swapPairs:', swapPairs2(head));


//2. 合并两个有序链表(leetcode 21)
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
// 方法一：递归
const mergeTwoLists1 = function(list1, list2){
   if(list1 === null){
       return list2;
   }
   if(list2 === null){
       return list1;
   }
   if(list1.val < list2.val){
       list1.next = mergeTwoLists(list1.next, list2);
       return list1;
   }else{
       list2.next = mergeTwoLists(list1, list2.next);
       return list2;
   }
}

// 方法二: 迭代
// 判断 l1 和 l2 哪一个链表的头节点的值更小，将较小值的节点添加到结果里，当一个节点被添加到结果里之后，将对应链表中的节点向后移一位。
const mergeTwoLists2 = function(list1, list2){
    let prehead = new ListNode(0);
    let prev = prehead;
    while(list1 !== null && list2 !== null){
        if(list1.val < list2.val){
            prev.next = list1;
            list1 = list1.next;
        }else{
            prev.next = list2;
            list2 = list2.next;
        }
        prev = prev.next;
    }
    prev.next = list1 === null ? list2 : list1;
    return prehead.next;
}

// const l1 = createList([1,2,4]), l2 = createList([1,3,4]);
// console.log('mergeTwoLists:', mergeTwoLists2(l1, l2));

//3. 删除排序链表中的重复元素
// 给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。
const deleteDuplicates = function(head){
    if(!head) return head;
    let cur = head;
    while(cur.next){
        if(cur.val === cur.next.val){
            cur.next = cur.next.next;
        }else{
            cur = cur.next;
        }
    }
    return head;
}

// const head = createList([1,1,1,2,2,3,3,3]);
// console.log('deleteDuplicates:', deleteDuplicates(head));


//4. 删除排序链表中的重复元素 II(leetcode 44)
// 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
const deleteDuplicates2 = function(head){

}




























