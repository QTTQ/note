package problem003

// import (
// 	"fmt"
// )

// func main() {
// 	silceList := [][]int{
// 		[]int{1, 2, 8, 9},
// 		[]int{2, 4, 9, 12},
// 		[]int{4, 7, 10, 13},
// 		[]int{6, 8, 11, 15},
// 	}

// 	fmt.Println(Find(silceList, 6))
// }
func Find(board [][]int, target int) bool {
	//  我们从右上角的元素找起来
	clen := len(board)
	rlen := len(board[0])

	for r, c := 0, rlen-1; c < clen && r >= 0; {
		if board[c][r] == target {
			return true
		}
		if board[c][r] > target {
			r--
			continue
		} else {
			c++
		}
	}
	return false

}
