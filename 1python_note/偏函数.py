import functools
def int(x,y):
    return x+y
int2 = functools.partial(int, y=8)
# 这样int2就获得了int的本领，并且呢，它的默认参数还是8
# 当然也就是八进制
# 这个偏函数跟下面的这个意思是一样的

# def int2(x, y=8):
#     return int(x, y)
int2(2)