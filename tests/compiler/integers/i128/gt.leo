/*
namespace: Compile
expectation: Pass
input_file:
 - inputs/eq.in
 - inputs/gt.in
*/

program test.aleo {    
    transition main(a: i128, b: i128, c: bool) -> bool {
        return a > b == c;
    }
}
