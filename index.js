const { default: Validator } = require('./dist/Validator');

// # How can I check if an object is an array?
// if (Object.prototype.toString.call(someVar) === '[object Array]') {
// 	alert('Array!');
// }

const schema = {
	username: {
		type: String,
		require: true,
		lower: true,
		length: '8|10',
		errorMessage: {
			// type: 'username must be contain valid characters',
			require: 'ai field ta dite hobe',
		},
	},
	phone: {
		type: Number,
		require: false,
	},
	password: {
		type: String,
		require: true,
		lower: true,
		length: '8|10',
	},
};

// another style
const schemaBeta = {
	username: 'str|requried|lower|min:10|max:20',
	phone: 'num|max:12',
	password: 'str|requried|min:8|max:20',
};

const user = new Validator(schema);
user.body({
	username: '2asas',
	password: 'password123',
});
// if (!user.isValid()) {
// }
console.log(user.isValid(), user.errors());
// user.test();
