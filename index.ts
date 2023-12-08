import express, { Request, Response } from "express";
const app = express();
import { randomBytes } from "crypto";

import { body, validationResult } from "express-validator";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Hi");
});

app.post(
  "/signin",
  body("email").notEmpty().withMessage("Email must be defined"),
  body("password").notEmpty().withMessage("Password must not be empty"),
  body("email").isEmail().withMessage("Not a valid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password musgt be agleast 8 characters long"),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }

      res.status(200).send({ email, id: randomBytes });
    } catch (e) {
      console.log(e);
      res.status(422).send("Unproccessable entity");
    }
  }
);

app.listen(3001, async () => {
  try {
    // await pool.connect();

    console.log("App listening on PORT 3001");
  } catch (e) {
    console.log(e);
  }
});
