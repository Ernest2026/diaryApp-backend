import supertest from 'supertest';
import app from '@/app'

// export const chance = new Chance();

export const endpoint = '/api/v1'

export const client = supertest(app)

