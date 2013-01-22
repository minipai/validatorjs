describe('Validator()', function() {
	var validator;

	beforeEach(function() {
		validator = new Validator({
			name: 'David',
			email: 'dtang@usc.edu'
		}, {
			name: 'required',
			email: 'required'
		});
	});
	
	it('should have a rules property containing all the validation rules', function() {
		expect(validator.rules).toBeTruthy();
	});

	it('should have an input property containing the input data to be validated', function() {
		expect(validator.input).toBeTruthy();
	});

	it('should have a passes() method', function() {
		expect(typeof validator.passes).toEqual('function');
	});

	it('should have a fails() method', function() {
		expect(typeof validator.fails).toEqual('function');
	});

	it('should have an errors property containing validation errors', function() {
		expect(validator.errors).toBeDefined();
	});

	it('should have a check method', function() {
		expect(typeof validator.check).toEqual('function');
	});
}); // Page constructor


describe('required validator flag', function() {
	var validator;

	it('should pass with non-empty strings for required data fields', function() {
		validator = new Validator({
			name: 'David',
			email: 'dtang@usc.edu'
		}, {
			name: 'required',
			email: 'required'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with empty strings for required data fields', function() {
		validator = new Validator({
			name: 'David',
			email: ''
		}, {
			name: 'required',
			email: 'required'
		});

		expect(validator.fails()).toBeTruthy();
		console.log(validator.errors);
	});
});

describe('email validator flag', function() {
	var validator;

	it('should pass with the email address: dtang85@gmail.com', function() {
		validator = new Validator({
			name: 'David',
			email: 'dtang85@gmail.com'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it ('should fail with the email address: dtang85.gmail.com', function() {
		validator = new Validator({
			name: 'David',
			email: 'dtang85.gmail.com'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.fails()).toBeTruthy();
		console.log(validator.errors);
	});

	it('should fail with the email address: dtang85@gmail', function() {
		validator = new Validator({
			name: 'David',
			email: 'dtang85@gmail'
		}, {
			name: 'required',
			email: 'required|email'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('size validator flag', function() {
	var validator;

	it('should fail with the state = C. Size must be 2 letters.', function() {
		validator = new Validator({
			state: 'C'
		}, {
			state: 'size:2'
		});

		expect(validator.fails()).toBeTruthy();
	});
	
	it('should pass with the state = CA. Size must be 2 letters.', function() {
		validator = new Validator({
			state: 'CA'
		}, {
			state: 'size:2'
		});

		expect(validator.passes()).toBeTruthy();
		console.log(validator.errors);
	});

	it('should pass with the age 65. Size must be 65', function() {
		validator = new Validator({
			age: 65
		}, {
			age: 'size:65'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age 64. Size must be 65.', function() {
		validator = new Validator({
			age: 64
		}, {
			age: 'size:65'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('min validator flag', function() {
	var validator;

	it('should fail with the name "D". Minimum size is 2 letters.', function() {
		validator = new Validator({
			name: 'D'
		}, {
			name: 'min:2'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "Da". Minimum is 2 letters.', function() {
		validator = new Validator({
			name: 'Da'
		}, {
			name: 'min:2'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should pass with the age "18". Minimum is 18.', function() {
		validator = new Validator({
			age: 18
		}, {
			age: 'min:18'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "17". Minimum is 18.', function() {
		validator = new Validator({
			age: 17
		}, {
			age: 'min:18'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should fail with value of 0.04', function() {
		validator = new Validator({
			val: 0.04
		}, {
			val: 'min:0.05'
		});

		expect(validator.fails()).toBeTruthy();
	});
});


describe('max validator flag', function() {
	var validator;

	it('should fail with the name "David". Maximum size is 3 letters.', function() {
		validator = new Validator({
			name: 'David'
		}, {
			name: 'max:3'
		});

		expect(validator.passes()).toBeFalsy();
	});

	it('should pass with the name "David". Maximum size is 5 letters.', function() {
		validator = new Validator({
			name: 'Da'
		}, {
			name: 'max:5'
		});

		expect(validator.passes()).toBeTruthy();
	});

	it('should fail with the age "18". Max is 12.', function() {
		validator = new Validator({
			age: 18
		}, {
			age: 'max:12'
		});

		expect(validator.fails()).toBeTruthy();
	});

	it('should pass with the age "12". Max is 12.', function() {
		validator = new Validator({
			age: 12
		}, {
			age: 'max:12'
		});

		expect(validator.passes()).toBeTruthy();
	});
});

describe('error messages', function() {
	var validator;

	it('should return an error message that states the email is required', function() {
		validator = new Validator({
			email: ''
		}, {
			email: 'required|email'
		});

		expect(validator.first('email')).toEqual('The email field is required.');
	});

	it('should return an error message that states the email is required', function() {
		validator = new Validator({
			email: 'john@yahoo'
		}, {
			email: 'required|email'
		});

		expect(validator.first('email')).toEqual('The email field must be a valid email address.');
	});

	it('should return null for a key without an error message', function() {
		validator = new Validator({ name: 'David' }, { name: 'required' });
		expect(validator.first('name')).toBeFalsy();
	});
});