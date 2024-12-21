const { exec } = require("child_process");
const fs = require("fs");

const runTests = async () => {
  console.log("Testing runtimes for Java, Python, JavaScript, and C++...\n");

  // Test Java
  const javaCode = `
public class Test {
  public static void main(String[] args) {
    System.out.println("Hello from Java!");
  }
}`;
  fs.writeFileSync("Test.java", javaCode);
  exec("javac Test.java && java Test", (err, stdout, stderr) => {
    if (err) {
      console.error("Java Error:", stderr);
    } else {
      console.log("Java Output:", stdout.trim());
    }
  });

  // Test Python
  const pythonCode = `print("Hello from Python!")`;
  fs.writeFileSync("test.py", pythonCode);
  exec("python3 test.py", (err, stdout, stderr) => {
    if (err) {
      console.error("Python Error:", stderr);
    } else {
      console.log("Python Output:", stdout.trim());
    }
  });

  // Test JavaScript
  const jsCode = `console.log("Hello from JavaScript!");`;
  fs.writeFileSync("test.js", jsCode);
  exec("node test.js", (err, stdout, stderr) => {
    if (err) {
      console.error("JavaScript Error:", stderr);
    } else {
      console.log("JavaScript Output:", stdout.trim());
    }
  });

  // Test C++
  const cppCode = `
#include <iostream>
using namespace std;
int main() {
    cout << "Hello from C++!" << endl;
    return 0;
}`;
  fs.writeFileSync("test.cpp", cppCode);
  exec("g++ test.cpp -o test && ./test", (err, stdout, stderr) => {
    if (err) {
      console.error("C++ Error:", stderr);
    } else {
      console.log("C++ Output:", stdout.trim());
    }
  });
};

runTests();
