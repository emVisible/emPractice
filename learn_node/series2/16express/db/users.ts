import { User } from "./seed"
async function createUser(name: string, age: number) {
  const user = await User.create({ name, age })
  console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
  console.log("[System] User created.")
  console.log('🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹')
  return user.toJSON()
}
async function findAll() {
  const users = await User.findAll()
  return users.map((user) => user.toJSON())
}
async function findOne(id: number) {
  const user = await User.findByPk(id)
  return user.toJSON()
}
async function update(id: number, name: string, age: number) {
  const user = await User.findByPk(id)
  if (user) {
    // user.name = name
    // user.age = age
    console.log('user', user)
    user.save()
  }
}

async function deleteOne(id: number) {
  const user = await User.findByPk(id)
  if (user) {
    user.destroy()
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
    console.log("[System] User deleted.")
    console.log('🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸')
  }
  return user
}
export const dbUser = {
  User,
  createUser,
  findAll,
  findOne,
  update,
  deleteOne
}