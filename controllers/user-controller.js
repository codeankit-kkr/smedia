import User from "../model/User";
import bcrypt from 'bcrypt';
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (er) {
        console.log(er)
    }
    if (!users) {
        return res.status(404).json("No users found.");
    }
    return res.status(200).json({ users: users });
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existinguser;
    try {
        existinguser = await User.findOne({ email });
    }
    catch (err) {
        return console.log(err);
    }
    if (!existinguser) {
        return res.status(404).json({ message: "Invalid email or password." });
    }
    const isvalidPassword = bcrypt.compareSync(password, existinguser.password);
    if (!isvalidPassword) {
        return res.status(404).json({ message: "Invalid details." });
    }
    else {
        return res.status(200).json({ message: "Login Successful" });
    }
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existinguser;
    try {
        existinguser = await User.findOne({ email });
    }
    catch (er) {
        console.log(er);
    }
    if (existinguser) {
        return res.status(400).json({ message: "User already existing." });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    })
    try {
        await newUser.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ newUser });

}