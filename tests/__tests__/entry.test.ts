import { StatusCodes } from 'http-status-codes';
import { generateUser } from '../utils';
import TokenService from '@/services/token';
import { client, endpoint } from '../setup';
import { User } from '@prisma/client'

const baseEndpoint = `${endpoint}/entries`

describe('Entry Endpoints', () => {
  let entryId: string
  let user: User
  let user2: User
  let accessToken: string
  let accessToken2: string

  beforeAll(async () => {
    user = await generateUser()
    user2 = await generateUser()
    accessToken = await TokenService.generateAccessToken(user)
    accessToken2 = await TokenService.generateAccessToken(user2)
  })

  it('should create an entry', async () => {
    const response = await client
      .post(baseEndpoint)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test Entry',
        emoji: '😊',
        text: 'This is a test entry.'
      });

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe('Entry created!');
    expect(response.body.data).toHaveProperty('id');
    entryId = response.body.data.id;
  });

  it('should get all entries', async () => {
    const response = await client
      .get(baseEndpoint)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
  });

  it('should get a specific entry', async () => {
    const response = await client
      .get(`${baseEndpoint}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('id', entryId);
  });

  it('should update an entry', async () => {
    const response = await client
      .put(`${baseEndpoint}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Updated Test Entry',
        emoji: '😄',
        text: 'This is an updated test entry.'
      });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Entry updated!');
  });

  it("should not allow a user to read another user's entry", async () => {
    const response = await client
      .get(`${baseEndpoint}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('You are not allowed to read this entry!');
  });

  it("should not allow a user to update another user's entry", async () => {
    const response = await client
      .put(`${baseEndpoint}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send({
        title: 'Updated Test Entry',
        emoji: '😄',
        text: 'This is an attempt to update the entry by another user.'
      });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('You are not allowed to update this entry!');
  });
  
  it("should not allow a user to delete another user's entry", async () => {
    const response = await client
      .delete(`${baseEndpoint}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('You are not allowed to delete this entry!');
  });

  it('should delete an entry', async () => {
    const response = await client
      .delete(`${baseEndpoint}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Entry deleted!');
  });
});
