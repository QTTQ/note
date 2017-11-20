function fact(n) {
    return n <= 0 ? 1 : n * fact(n - 1);
}

fact(5);  // 120