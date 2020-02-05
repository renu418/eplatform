import java.io.*;
import java.util.Scanner;

class app1 {
    public static int add(int a, int b) {
        return (a + b);
    }
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int tt = s.nextInt();
        while(tt-- > 0) {
            int a = s.nextInt();
            int b = s.nextInt();
            System.out.println(add(a, b));
        }
    }
}