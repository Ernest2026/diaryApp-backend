import TestModel from "../../services/user.service";
import { Request, Response } from "express";

const { getAllSomething } = new TestModel();

class Test {
  args: (string | undefined)[];
  constructor(...args: (string | undefined)[]) {
    this.args = args;
  }

  async httpGetSomething(req: Request, res: Response) {
    let user = await UserMOngo.findOne({ _id: req.query.userId });

    await update(user, payload)
    return res.status(200).json(await getAllSomething());
  }
}

export default Test;
