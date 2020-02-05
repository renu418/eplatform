def add(a, b):
    return (a + b)


for _ in range(int(input())):
    a, b = map(int, input().split())
    print(add(a, b))