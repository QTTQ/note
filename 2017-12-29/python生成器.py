# --生成器 generator

g=(x*x fro x in range(10))
for n in g:
    print(n)

def fib(max):
    n,a,b=0,0,1
    while n<max:
        print(b)
        a,b=b,a+b
        n=n+1
    return 'done'

def fib(max):
    n,a,b=0,0,1
    while n<max:
        yield b
        a,b=b,a+b
        n=n+1
    return 'done'

f=fib(6)
f
#f是个generator函数了  可以用next(f) 一次一次获取里边值

    