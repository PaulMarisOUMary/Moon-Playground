export const comments = `# This is a single-line comment.

(
    This is a multi
                    -line comment.
)
`

export const primitives = `# Boolean
💡 is false
fact is true

# String
🍏 is "apple"
name is "Alice"

# Integer
🔢 is 14
count is 0

# Floating-point
🧪 is 0.001
pi is 3.14

# Null
🚫 is null
empty is null

print 💡 🍏 🔢 🧪 🚫
print fact name count pi empty
`

export const expressions = `# Arithmetic Expressions

# Addition
print 1 + 2
# Subtraction
print 1 - 2
# Multiplication
print 1 * 2
#Division
print 1 / 2
# Modulo
print 1 % 2
# Exponentiation
print 1 ** 2

# Logical Expressions

# And
print true and false
# Or
print true or false
# Not
print not true

# Relational Expressions

# Less than
print 1 < 2
# Less than or equal
print 1 <= 2
# Greater than
print 1 > 2
# Greater than or equal
print 1 >= 2
# Equal
print 1 is 2
# Not equal
print 1 isnt 2
`

export const conditional = `x is 1
y is 2

# If statement
if x < y
	print x "is less than" y

# Else statement
if x > y
	print x "is greater than" y
else
	print x "is not greater than" y
`

export const while_loop = `# Simple while loop
count is 0

while count < 10
	count is count + 1

	print count

print "Done !"



# While using skip and stop

to_guess is 5
guess is 0

while true
	guess is guess + 1

	if guess isnt to_guess
		if guess < to_guess
			print "Its More"
		else
			print "Its Less"
		skip

	stop

print "Guessed :" guess
`

export const function_examples = `# Simple function
action dummy
	print "Hello !"

call dummy



# Function with parameter
action hello text
	print "Hello" text '!'

call hello "world"



# Function with result (and parameters)
action addNumbers a b
	result a + b

sum is call addNumbers 1 2
print sum
`

export const builtin = `( 
	Moon is still under development ! 

	So we are currently only supporting print and ask
	as built-in functions.
)

# Ask usage
ask "prompt"

variable is ask "Your prompt: "

# Print
print variable "another argument"
`