import { APIError } from '@/utils/error';
import { StatusCodes } from 'http-status-codes';
import { UserType } from '../../types/dbmodel';
import UserModel from '@/modules/user/model';
import GlobalLogger from '@/utils/logger';
import { Document } from 'mongoose';

class User {
  // args: (string | undefined)[];
  // constructor(...args: (string | undefined)[]) {
  //   this.args = args;
  // }

  async create(payload: UserType) {
    try {
      const user = await UserModel.create(payload);
      // GlobalLogger.debug(payload)
      return user;
    } catch (error: any) {
      GlobalLogger.debug(error)
      throw new APIError('Error from user service', {code: StatusCodes.INTERNAL_SERVER_ERROR});
    }
  }
  
  async find(email: string) {
    try {
      if (!email) {
        const profile: UserType | null = await UserModel.find();
        return profile;
        // throw new APIError('Enter email to find', {code: StatusCodes.INTERNAL_SERVER_ERROR})
      }
      const profile = await UserModel.findOne({email})
      return profile;
    } catch (error: any) {
      throw new APIError('error from user service', {code: StatusCodes.INTERNAL_SERVER_ERROR});
    }
  }
}

export default new User();
