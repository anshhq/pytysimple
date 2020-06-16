# Simple CRUD REST APIs in TypeScript

## Usage

1. If _node_modules_ directory is not there or it is missing dependencies, then do _cd **ts-simple-test-apis**_
   and _yarn install_.
2. _yarn build_, so it will create or overwrite a _**dist**_ directory.
3. _cd ts-simple-test-apis/dist/src_ and enter _**node index.js**_, it should start Node.js with message, _Server is listening on 4111_.
4. Postman collection _ts-simple-rest-apis.postman_collection.json_ is provided, please import it.
5. GET http://localhost:4111/profiles should return empty list, _[]_.
6. POST http://localhost:4111/profiles with mentioned data, should create a new Profile:

	```json
	{
	  "firstname": "John",
	  "lastname": "Doe",
	  "dob": "16/6/2020",
	  "address": "23rd Mukarji Nagar"
	}
	```

	Response:

	```json
	{
	  "nameFirst": "John",
	  "nameLast": "Doe",
	  "dob": "2020-06-15T18:30:00.000Z",
	  "address": "23rd Mukarji Nagar"
	}
	```

7. POST http://localhost:4111/profiles to create another Profile with mentioned data:

	```json
	{
	  "firstname": "John",
	  "lastname": "Doel",
	  "dob": "16/6/2020",
	  "address": "23rd Mukarji Nagar"
	}
	```

	Response:

	```json
	{
	  "nameFirst": "John",
	  "nameLast": "Doel",
	  "dob": "2020-06-15T18:30:00.000Z",
	  "address": "23rd Mukarji Nagar"
	}
	```

8. GET http://localhost:4111/profiles should return both profiles:

	```json
	[
		{
			"nameFirst": "John",
			"nameLast": "Doe",
			"dob": "2020-06-15T18:30:00.000Z",
			"address": "23rd Mukarji Nagar"
		},
		{
			"nameFirst": "John",
			"nameLast": "Doel",
			"dob": "2020-06-15T18:30:00.000Z",
			"address": "23rd Mukarji Nagar"
		}
	]
	```

9. PUT http://localhost:4111/profiles to update _address_ for Profile _John Doel_:

	```json
	{
	  "firstname": "John",
	  "lastname": "Doel",
	  "dob": "16/6/2020",
	  "address": "23rd Mukherjee Nagar"
	}
	```

	Response:

	```json
	{
	  "firstname": "John",
	  "lastname": "Doel",
	  "dob": "16/6/2020",
	  "address": "23rd Mukherjee Nagar"
	}
	```

10. GET http://localhost:4111/profiles should return both profiles:

	```json
	[
		{
			"nameFirst": "John",
			"nameLast": "Doe",
			"dob": "2020-06-15T18:30:00.000Z",
			"address": "23rd Mukarji Nagar"
		},
		{
			"nameFirst": "John",
			"nameLast": "Doel",
			"dob": "2020-06-15T18:30:00.000Z",
			"address": "23rd Mukherjee Nagar"
		}
	]
	```
