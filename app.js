export default (express, bodyParser, fs, headers, User, mongoose) => {
  const app = express();

  app
    .use((r, res, next) => r.res.set(headers) && next())
    .use(bodyParser.urlencoded({ extended: true }))
    .post("/insert/", async (r) => {
      const { login, password, URL } = r.body;
      const newUser = new User({ login, password });
      try {
        await mongoose.connect(URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await newUser.save();
        r.res.status(201).json({ "Добавлено: ": login });
      } catch (e) {
        r.res.status(400).json({ "Ошибка: ": "Нет пароля!" });
      }
    })
    .get("/login/", (req, res) => res.send("deadtrace"))
    .all("/*", (r) => r.res.send("deadtrace"));

  return app;
};
