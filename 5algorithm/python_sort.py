# 插入排序

# 插入排序原理：它的工作原理是通过构建有序序列，
#              对于未排序数据，在已排序序列中从
#              后向前扫描，找到相应位置并插入。
# 插入排序核心：假设第一个元素排好，之后的元素对
#              排好的部分从后向前比较并逐一移动。
arr = [3, 1, 4, 6, 5]


def insertion_sort(seq=None):
    if seq is None or len(seq) <= 1:
        return seq
    length = len(seq)
    for i in range(len(seq)):
        j = i
        while j >= 0 and seq[j] > seq[i]:
            seq[j], seq[i] = seq[i], seq[j]
            j -= 1
    return seq


print(insertion_sort(arr))


def insertion_sort1(seq=None):
    if seq is None or len(seq) <= 1:
        return seq
    length = len(seq)
    # MIND HERE: start with 1
    for i in range(1, length):
        val = seq[i]
        j = i
        while j > 0 and seq[j - 1] > val:
            seq[j] = seq[j - 1]
            j -= 1
        seq[j] = val
    return seq


print(insertion_sort1(arr))

# 选择排序


# 选择排序 (Selection Sort) 原理很简单，就是依
# 次在未排序数据段中选择出一个最小的数，然后将其
# 排列在已排序数据段末端，直到整个数据段排序完成算法结束。
# 程序如下，第一个循环依次缩小未排序数据段的长度，并
# 且每次将最小值暂定为未排序中第一位索引。第二个循环
# 依次将该最小值与未排序数据段作比较，选择出其中最小
# 值的索引，并且交换值将未排序第一位归类到已排序序列中。
def selection_sort(arr):
    for i in range(len(arr) - 1):
        for j in range(i + 1, len(arr)):
            if arr[i] > arr[j]:
                arr[j], arr[i] = arr[i], arr[j]
    return arr


print(selection_sort(arr))