//1. 合并两个有序数组
// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
// 方法一： 直接合并之后再排序
const merge1 = (nums1, m, nums2, n) => {
    for(let i = 0; i < n; i++){
        nums1[m + i] = nums2[i];
    }
    nums1.sort((a, b) => a - b);
    return nums1;
}

//方法二：双指针
// 将两个数组看作队列，每次从两个数组头部取出比较小的数字放到结果中
const merge2 = (nums1, m, nums2, n) => {
    let p1 = 0, p2 = 0;
    let sorted = new Array(m + n).fill(0);
    let cur;
    while(p1 < m || p2 < n){
        if(p1 === m){
            cur = nums2[p2++];
        }else if(p2 === n){
            cur = nums1[p1++];
        }else if(nums1[p1] < nums2[p2]){
            cur = nums1[p1++];
        }else{
            cur = nums2[p2++];
        }
        sorted[p1 + p2 - 1] = cur;
    }
    for(let i = 0; i < m + n; i++){
        nums1[i] = sorted[i];
    }
    return nums1;
}


//逆向双指针
// 可以指针设置为从后向前遍历，每次取两者之中的较大者放进 nums1 的最后面
const merge3 = (nums1, m, nums2, n) => {
    let p1 = m - 1, p2 = n - 1;
    let tail = m + n - 1;
    let cur;
    while(p1 >=0 || p2 >= 0){
        if(p1 === -1){
            cur = nums2[p2--];
        }else if(p2 === -1){
            cur = nums1[p1--];
        }else if(nums1[p1] > nums2[p2]){
            cur = nums1[p1--];
        }else{
            cur = nums2[p2--];
        }
        nums1[tail--] = cur;
    }
    return nums1;
}

const nums1 = [1,2,3,0,0,0], m = 3, nums2 =  [2,5,6], n = 3;
// const nums1 = [1], m = 1, nums2 = [], n = 0;
console.log('merge', merge3(nums1, m, nums2, n));












































































