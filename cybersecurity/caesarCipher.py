alphabet = "abcdefghijklmnopqrstuvwxyz"

def encrypt(message, key):

	message = message.lower()

	part1 = alphabet[:key]
	part2 = alphabet[key:]
	newAlphabet = part2 + part1

	encrypted = ""
	for i in range(len(message)):
		index = alphabet.find(message[i])
		if index < 0:
			encrypted += message[i]
		else:
			encrypted += newAlphabet[index]

	return encrypted

# print(encrypt("testing!", 3))


def decrypt(message, key):
	decrypted = ""

	message = message.lower()

	part1 = alphabet[:key]
	part2 = alphabet[key:]
	newAlphabet = part2 + part1

	decrypted = ""
	for i in range(len(message)):
		index = newAlphabet.find(message[i])
		if index < 0:
			decrypted += message[i]
		else:
			decrypted += alphabet[index]

	return decrypted

# print(decrypt("qhjrzvu!", 7))

def bruteforce(message):
	for i in range(26):
		print("attemp: ", i)
		print(decrypt(message, i))
		print()

# bruteforce("iybal mvyjl pz mbu!")