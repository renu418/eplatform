package com.mycompany.app;

public class app4 {
    public static int GCD(int a, int b) {
        return (a == 0) ? b : GCD(b % a, a);
    }

    public static void main(String[] args) {
        System.out.println(app4.GCD(4, 2));
    }
}