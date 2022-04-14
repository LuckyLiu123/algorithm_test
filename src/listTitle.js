import { ListNode, createList, getListLength, reverseLinkedList } from './untils.js';


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
    if(!head) return head;
    let dummy = new ListNode(0, head);
    let cur = dummy;
    while(cur.next && cur.next.next){
        if(cur.next.val === cur.next.next.val){
            let x = cur.next.val;
            while(cur.next && cur.next.val === x){
                cur.next = cur.next.next;
            }
        }else{
            cur = cur.next;
        }
    }
    return dummy.next;
}

// const head = createList([1,2,3,3,4,4,5]);
// const head = createList([1,1,1,2,3]);
// console.log('deleteDuplicates2:', deleteDuplicates2(head));


//5. 删除链表的倒数第 N 个结点(leetcode 19)
// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 方法一：计算链表的长度
const removeNthFromEnd1 = function(head, n){
    let dummy = new ListNode(0, head);
    let len = getListLength(head);
    let cur = dummy;
    for(let i = 1; i < len - n + 1; i++){
        cur = cur.next;
    }
    cur.next = cur.next.next;
    return dummy.next;
}

//方法二：栈 
// 在遍历链表的同时将所有节点依次入栈。根据栈「先进后出」的原则，我们弹出栈的第 n 个节点就是需要删除的节点，
// 并且目前栈顶的节点就是待删除节点的前驱节点。
const removeNthFromEnd2 = function(head, n){
    let dummy = new ListNode(0, head);
    let stack = [];
    let cur = dummy;
    while(cur){
        stack.push(cur);
        cur = cur.next;
    }
    for(let i = 0; i < n; i++){
        stack.pop();
    }
    let prev = stack[stack.length - 1];
    prev.next = prev.next.next;
    return dummy.next;
}

//方法三：双指针
// 由于我们需要找到倒数第 n 个节点，因此我们可以使用两个指针 first 和 second 同时对链表进行遍历，
// 并且 first 比 second 超前 n 个节点。当 first 遍历到链表的末尾时，second 就恰好处于倒数第 n 个节点。
const removeNthFromEnd3 = function(head, n){
    let dummy = new ListNode(0, head);
    let first = head;
    let second = dummy;
    for(let i = 0; i < n; i++){
        first = first.next;
    }
    while(first){
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}

// const head = createList([1,2,3,4,5]);
// console.log('removeNthFromEnd:', removeNthFromEnd3(head, 2));

//6. 反转链表 II(leetcode 92)
// 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表
// 方法一: 穿针引线
const reverseBetween1 = function(head, left, right){
    let dummy = new ListNode(0, head);

    let prev = dummy;
    // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
    for(let i = 0; i < left - 1; i++){
        prev = prev.next;
    }

    let rightNode = prev;
    // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
    for(let i = 0; i < right - left + 1; i++){
        rightNode = rightNode.next;
    }

    //截取链表
    let leftNode = prev.next;
    let curr = rightNode.next;

    //切断链接
    prev.next = null;
    rightNode.next = null;

    //反转链表
    reverseLinkedList(leftNode);

    //接回到原来的链表中
    prev.next = rightNode;
    leftNode.next = curr;
    return dummy.next;
}

//方法二：一次遍历「穿针引线」反转链表（头插法）
const reverseBetween2 = function(head, left, right){
    let dummy = new ListNode(0, head);

    let prev = dummy;
    for(let i = 0; i < left - 1; i++){
        prev = prev.next;
    }

    let cur = prev.next;
    for(let i = 0; i < right - left; i++){
        const next = cur.next;
        cur.next = next.next;
        next.next = prev.next;
        prev.next = next;
    }
    return dummy.next;
}

const head = createList([1,2,3,4,5]);
console.log('reverseBetween:', reverseBetween2(head, 2, 4));




















