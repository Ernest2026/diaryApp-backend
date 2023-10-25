import Joi from "joi";
import joiDate from "@joi/date";
const joi = Joi.extend(joiDate);
class Validations {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  /**
   * validate add or update page
   * @param {object} payload
   * @returns {boolean} - returns true if validation is successful
   * @memberof Validations
   */
  async validateTestQuery(payload: any): Promise<boolean> {
    const schema = joi.object({
      name: joi.string().required().label("invalid or missing name"),
    });
    const { error } = schema.validate(payload);
    if (error) throw error.details[0].context.label;
    return true;
  }
}

export default Validations;
