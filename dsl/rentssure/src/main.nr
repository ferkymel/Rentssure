use dep::std;

fn main(amount: u32, guess_the_amount: Field, amountHash: pub Field) {
    assert(amount == guess_the_amount as u32);

    let computed_hash = std::hash::pedersen_commitment([guess_the_amount]);
    assert(computed_hash.x == amountHash);
}

#[test]
fn test_main() {
    let amount_hash = std::hash::pedersen_commitment([4000]);
    std::println(amount_hash);
    main(4000, 4000, amount_hash.x);
}