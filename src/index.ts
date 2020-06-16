'use strict';

console.log('Node.js starting ..');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4111;

export interface Profile {
  nameFirst: string;
  nameLast: string;
  dob: Date | string;
  address: string;
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Server re/start, profiles are empty.
 */
let profiles: Array<Profile> = [];

let dateFromUserString = (dateUserString: string) => {
  let dateChunks = dateUserString.split('/');
  return new Date(parseInt(dateChunks[2]), parseInt(dateChunks[1]) - 1, parseInt(dateChunks[0])) || 'Invalid date';
};

let sanityCheckUserInput = (inputData: Array<string>) => {
  let errors: Array<string> = [],
    nameFirstVal = inputData[0],
    nameLastVal = inputData[1],
    dobVal = inputData[2],
    addressVal = inputData[3];

  if (nameFirstVal === undefined || nameLastVal === undefined || dobVal === undefined || addressVal === undefined || nameFirstVal === null || nameLastVal === null || dobVal === null || addressVal === null) {
    errors.push("Any of field values 'firstname', 'lastname', 'dob', 'address' may not be null and may not be undefined.");
  } else if (typeof nameFirstVal !== 'string' || typeof nameLastVal !== 'string' || typeof dobVal !== 'string' || typeof addressVal !== 'string' || nameFirstVal.length < 3 || nameLastVal.length < 3 || dobVal.length < 3 || addressVal.length < 3) {
    errors.push("All of field values 'firstname', 'lastname', 'dob', 'address' may be string values, each of minimum length 3.");
  }
  return errors;
};

app.get('/', (_req: any, res: any) => {
  res.send('Okay');
});

app.get('/profiles', (_req: any, res: any) => {
  res.send(profiles);
  res.end();
});

app.post('/profiles', (req: any, res: any) => {
  let errors: Array<string> = [],
    nameFirstVal = req.body.firstname,
    nameLastVal = req.body.lastname,
    dobVal = req.body.dob,
    addressVal = req.body.address,
    profile: Profile = { nameFirst: '', nameLast: '', dob: '', address: '' };

  errors = [...sanityCheckUserInput(Array(nameFirstVal, nameLastVal, dobVal, addressVal))];

  if (profiles.find((o) => o.nameFirst === nameFirstVal && o.nameLast === nameLastVal)) {
    errors.push('We allow only one profile with same firstname, lastname, please enter a different record.');
  } else {
    profile = { nameFirst: nameFirstVal, nameLast: nameLastVal, dob: dateFromUserString(dobVal), address: addressVal };
  }

  if (errors.length > 0) {
    res.send(errors);
  } else {
    profiles.push(profile);
    res.send(profile);
  }
  res.end();
});

app.put('/profiles', (req: any, res: any) => {
  let errors: Array<string> = [],
    nameFirstVal = req.body.firstname,
    nameLastVal = req.body.lastname,
    dobVal = req.body.dob,
    addressVal = req.body.address,
    profilefindObj = null,
    profile: Profile = { nameFirst: '', nameLast: '', dob: '', address: '' };

  errors = [...sanityCheckUserInput(Array(nameFirstVal, nameLastVal, dobVal, addressVal))];

  if (errors.length > 0) {
    res.send(errors);
    res.end();
  } else {
    profilefindObj = profiles.find((o) => o.nameFirst === nameFirstVal && o.nameLast === nameLastVal);
    if (profilefindObj) {
      profile = profilefindObj;
      profile.dob = dateFromUserString(dobVal);
      profile.address = addressVal;
      res.send(profile);
    } else {
      errors.push('No matching profile is found.');
      res.send(errors);
    }
    res.end();
  }
});

app.listen(PORT, () => {
  console.log('Server is listening on', PORT);
});
