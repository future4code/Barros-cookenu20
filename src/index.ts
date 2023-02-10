import { app } from "./controller/app"
import { userRouter } from "./controller/routes/userRouter"
import { recipeRouter } from "./controller/routes/recipeRouter"
import { friendRouter } from "./controller/routes/friendRouter"

app.use('/user', userRouter)

app.use('/recipe',recipeRouter)

app.use('/friend',friendRouter)
