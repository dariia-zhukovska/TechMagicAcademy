
const updateObjectInArray = <ObjectShape>(
	initialArray: ObjectShape[],
	keyToFind: keyof ObjectShape,
	keyValueToFind: ObjectShape[keyof ObjectShape],
	patch: Partial<ObjectShape>,
): ObjectShape[] => {
	const clone: ObjectShape[] = JSON.parse(JSON.stringify(initialArray));

	return clone.map((item) => {
		if (item[keyToFind] === keyValueToFind) {
			return {
				...item, // spread
				...patch,
			}
		}
		return item;
	});
};

const arr = [
	{
		id: 1,
		name: 'John',
		email: 'test@mail.com',
	},
	{
		id: 2,
		name: 'Peter',
		email: 'test111@mail.com',
	}
];

const patch = {
	id: 1,
	name: 'Jane',
}

console.log(updateObjectInArray(arr, "id", 1, patch));
