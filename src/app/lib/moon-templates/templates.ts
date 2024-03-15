export const fizzbuzz = `(
    FizzBuzz
    Print "Fizz" for multiples of 3,
    "Buzz" for multiples of 5, and
    "FizzBuzz" for multiples of both 3 and 5.
    All other numbers are printed as they are.
)

x is 1
while x <= 100
    out is ''

    if x % 3 is 0
        out is out + "Fizz"
    if x % 5 is 0
        out is out + "Buzz"

    print out or x
    x is x + 1
`

export const guess_game = `(
	Guess the number
	This is a simple example made to show
	the use of: while loop, if, else,
    print, skip and stop statements.
)

to_guess is 14

# Version using while, skip and stop

while true
	guess is ask "Type your guess: "

	if guess isnt to_guess
		if guess < to_guess
			print "Its More"
		else
			print "Its Less"
		skip

	stop

print "Congrats you won !"
`

export const guess_game_recursive = `(
	Guess the number
	This is a simple example made to show
	the use of: action, recursives, if,
    else, print and call statements.
)

to_guess is 14

# Alternative version using action

action guess_game
	guess is ask "Type your guess: "

	if guess isnt to_guess
		if guess < to_guess
			print "Its More"
		else
			print "Its Less"
		call guess_game
	else
		print "Congrats you won !"

call guess_game
`

export const is_prime = `(
    Prime Numbers
    A prime number is a number greater
    than 1 that cannot be evenly divided
    by any number except 1 and itself.
)

action isPrime number
	if number < 2
        result false

    divisor is 2
    while divisor * divisor <= number
        if number % divisor is 0
            result false
        divisor is divisor + 1

    result true

count is 0
while count <= 25
    print count "Is prime:" call isPrime count
    count is count + 1
`