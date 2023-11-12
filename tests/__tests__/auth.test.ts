import { StatusCodes } from 'http-status-codes';
import { generateUser } from '../utils';
import TokenService from '@/utils/token';
import { client, endpoint } from '../setup';
import { User } from '@prisma/client'
import { Chance } from 'chance';

const chance = new Chance();

const baseEndpoint = `${endpoint}/auth`

const user = {
  fullname: chance.name(),
  email: chance.email(),
  password: chance.string({ length: 10 })
}

// const loginUser = {
//   email: "foluso2004ng@gmail.com",
//   password: "12345",
// };

describe('Entry Endpoints', () => {
  it('POST /signup', async () => {
    const response = await client
      .post(`${baseEndpoint}/signup`)
      .send(user);

      console.log(user);
      

      console.log(response);
      
      // .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe('User created successfully');
  });
});
