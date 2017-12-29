# -- 生成列表list
list(range(1,11))
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
L = []

[x * x for x in range(1, 11)]
[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

[x * x for x in range(1, 11) if x % 2 == 0]
[4, 16, 36, 64, 100]

[m + n for m in 'ABC' for n in 'XYZ']
['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']

d = {'x': 'A', 'y': 'B', 'z': 'C' }
[k + '=' + v for k, v in d.items()]
['y=B', 'x=A', 'z=C']

L = ['Hello', 'World', 'IBM', 'Apple']
[s.lower() for s in L]
['hello', 'world', 'ibm', 'apple']