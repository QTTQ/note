package main

import (
	"fmt"
	"math"
)


//非递归
func BinarySearch(sortedArray []int, lookingFor int) int {
	var low int = 0
	var height int = len(sortedArray) - 1 //表示数组的最大下标
	for low <= height {
		var mid int = low + (height-low)/2
		var midValue int = sortedArray[mid]
		if midValue == lookingFor {
			return midValue
		} else if midValue > lookingFor {
			height = mid - 1

		} else if midValue < lookingFor {
			low = mid + 1
		}
	}
	return -1
}
//递归
func BinarySearch1(sortedArray []int,start, end,tagret int) int{
	mid:=int(math.Floor(float64((start+end)/2)))
	if (sortedArray)[mid]==tagret{
		return mid
	}
	fmt.Println(len(sortedArray))
	if tagret<=(sortedArray)[mid]{
		return BinarySearch1(sortedArray,start,mid-1,tagret)
	}else {
		return BinarySearch1(sortedArray,mid+1,end,tagret)
	}
}

func main() {
	var lookingFor int = 9
	var lookingFor1 int = 3
	var sortedArray []int = []int{1, 3, 4, 7, 9, 11,18,21,28,30,31,34,35}
	result := BinarySearch(sortedArray, lookingFor)
	result1 := BinarySearch1(sortedArray,0,len(sortedArray), lookingFor1)
	if result >= 0 {
		fmt.Println("result",result)
	} else {
		fmt.Println("result no")
	}
	if result1 >= 0 {
		fmt.Println("result1",result1)
	} else {
		fmt.Println("result1 no")
	}
}
