import app from '@/app';
import { Chance } from 'chance';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import { generateUser } from '../utils';
import TokenService from '@/utils/token';
import DBConnection from '@/utils/database';

const request = supertest(app);
const chance = new Chance();

const baseUrl = "/api/v1/entries";

let entryId: string, user, accessToken: string, accessToken2: string;
// let entryId: string, userEmail: string, userEmail2: string, accessToken: string, accessToken2: string;

beforeAll(async () => {
  await DBConnection.mongoConnect();
  user = await generateUser();
  accessToken = await TokenService.generateAccessToken(user.email);
  accessToken2 = await TokenService.generateAccessToken(chance.email());
  // userEmail = chance.email();
  // userEmail2 = chance.email();
  // accessToken = await TokenService.generateAccessToken(userEmail)
  // accessToken2 = await TokenService.generateAccessToken(userEmail2)
});

afterAll(async () => {
  await DBConnection.mongoDisconnect();
});

describe('Entry Endpoints', () => {
  it('should create an entry', async () => {
    const response = await request
      .post(baseUrl)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Test Entry',
        emoji: '😊',
        text: 'This is a test entry.'
      });

    // expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.message).toBe('Entry created!');
    expect(response.body.data).toHaveProperty('id');
    entryId = response.body.data.id;
  });

  it('should get all entries', async () => {
    const response = await request
      .get(baseUrl)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('meta');
  });

  it('should get a specific entry', async () => {
    const response = await request
      .get(`${baseUrl}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty('id', entryId);
  });

  it('should update an entry', async () => {
    const response = await request
      .put(`${baseUrl}/${entryId}`)
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
    const response = await request
      .get(`${baseUrl}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('Unauthorized');
    // expect(response.body.error).toBe('You are not allowed to read this entry!');
  });

  it("should not allow a user to update another user's entry", async () => {
    const response = await request
      .put(`${baseUrl}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send({
        title: 'Updated Test Entry',
        emoji: '😄',
        text: 'This is an attempt to update the entry by another user.'
      });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('Unauthorized');
    // expect(response.body.error).toBe('You are not allowed to update this entry!');
  });
  
  it("should not allow a user to delete another user's entry", async () => {
    const response = await request
      .delete(`${baseUrl}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken2}`)
      .send();

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.body.error).toBe('You are not allowed to delete this entry!');
  });

  it('should delete an entry', async () => {
    const response = await request
      .delete(`${baseUrl}/${entryId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    // expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.message).toBe('Entry deleted!');
  });
});