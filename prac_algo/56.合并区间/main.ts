function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [];
  for (const interval of intervals) {
    // 如果列表为空，或者当前区间与上一区间不重合，直接添加
    if (!merged.length || merged[merged.length - 1][1] < interval[0]) {
      merged.push(interval);
    } else {
      // 否则的话，我们就可以与上一区间进行合并
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], interval[1]);
    }
  }

  return merged;
};
const res = merge([[1, 3], [2, 6], [8, 10], [15, 18]])
console.log('res', res)