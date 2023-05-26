const createUser = async (req, res) => {
    res.send('User Created')
}

const deleteUserByID = async (req, res) => {
    res.send('User Deleted')
}

const getAllUser = async (req, res) => {
    res.send('Got All Users!')
}

const updateUserById = async (req, res) => {
    res.send('User 69 Updated!')
}

const showStatsOfUser = async (req, res) => {
    res.send('Ei lo tor stats')
}

module.exports = { createUser, deleteUserByID, getAllUser, updateUserById, showStatsOfUser };