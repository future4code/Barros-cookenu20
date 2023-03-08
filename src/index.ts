import { app } from "./controller/app"
import { userRouter } from "./controller/routes/userRouter"
import { recipeRouter } from "./controller/routes/recipeRouter"

app.use('/user', userRouter)

app.use('/recipe',recipeRouter)

