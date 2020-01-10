import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;
import java.util.regex.Pattern;
import java.lang.Runtime;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.*;

public class Main {
    public static double GetPercentage(int total, int got) {
        return ((total - got) / (total * 1.0)) * 100.0;
    }

    public static void WriteData(String str) throws IOException  {
        FileWriter fw = new FileWriter("output.txt");
        Double percentage = Double.parseDouble(str);
        if(percentage > 60.00) {
            fw.write("Thank you for your interest in GS Lab." + '\n' + '\n' + "You are shortlisted for the next round" + '\n' + '\n' + "you have scored " + str + "%");
        }else {
            fw.write("Thank you for your interest in GS Lab." + '\n' + "We regret to inform you that we will not be able to take your candidature forward at this time.");
        }
        System.out.println("Writing successful");
        fw.close();
    }

    public static List<String> getFiles() {
        List<String> fileName = new ArrayList<String>(5);
        File folder = new File("data/my-app/src/main/java/com/mycompany/app/");
        String[] files = folder.list();
        for (String file : files) {
            String firstPart = file.substring(0, file.indexOf("."));
            fileName.add(firstPart);
        }
        return fileName;
    }

    public static double totalPercentage(List<String> fileName) throws Exception {
        double totalPercentage = 0.0, current_percentage;
        for (String filesName : fileName) {
            System.out.println("Name is : " + filesName);
            File file = new File("data/my-app/target/surefire-reports/com.mycompany.app."+ filesName + "Test.txt");
            Scanner sc = new Scanner(file);
            String regex = "run:";
            Pattern pattern = Pattern.compile(regex);
            int totalTC = 0, Failed = 0, Error = 0;
            while (sc.hasNextLine()) {
                String str = sc.nextLine();
                if(pattern.matcher(str).find()) {
                    String s1 = ":", s2 = ", Failures", s3 = ", Errors", s4 = ", Skipped";
                    int idx1 = str.indexOf(s1);
                    int idx2 = str.indexOf(s2);
                    int idx3 = str.indexOf(s3);
                    int idx4 = str.indexOf(s4);
                    for(int i = idx1 + 2; i <= idx2; i++) {
                        if(Character.isDigit(str.charAt(i))) {
                            totalTC = totalTC * 10 + Integer.parseInt(String.valueOf(str.charAt(i)));
                        }
                    }
                    for(int i = idx2 + s2.length() + 2; i < idx3; i++) {
                        if(Character.isDigit(str.charAt(i))) {
                            Failed = Failed * 10 + Integer.parseInt(String.valueOf(str.charAt(i)));
                        }
                    }
                    for(int i = idx3 + s3.length() + 2; i <= idx4; i++) {
                        if(Character.isDigit(str.charAt(i))) {
                            Error = Error * 10 + Integer.parseInt(String.valueOf(str.charAt(i)));
                        }
                    }
                }
            }
            // System.out.println("Total TC: " + totalTC);
            // System.out.println("Failed: " + Failed);
            // System.out.println("Error: " + Error);
            if(totalTC == Error) {
                current_percentage = 0.0;
            }else {
                current_percentage = Main.GetPercentage(totalTC, Failed);
            }
            // System.out.println(String.format("%.2f", percentage) + "%");
            totalPercentage += current_percentage;
        }
        return totalPercentage;
    }

    public static void INIT() {
        try {
            Process process = Runtime.getRuntime().exec("mvn -f data/my-app package");
            BufferedReader b = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = "";
            while ((line = b.readLine()) != null) {
                System.out.println(line);
            }
        }
        catch (Exception e) {
            System.out.println("Got some errors...");
        }
    }

    public static void PROCESS() throws Exception {
        List<String> fileName = getFiles();
        double totalPercentage = totalPercentage(fileName);
        System.out.println(String.format("%.2f", totalPercentage / 5) + "%");
        WriteData(String.format("%.2f", totalPercentage / 5));
    }

    public static void EMAIL() throws Exception {
        Runtime.getRuntime().exec("python3 data/email_user.py");
    }

    public static void main(String[] args) throws Exception {
        Main.INIT();
        Main.PROCESS();
        Main.EMAIL();
    }
}