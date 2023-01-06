export const getSender = (loggedInUser, users) => {
    // console.log(users[0]._id, loggedInUser?._id,users[0]._id === loggedInUser?._id)
    

    return users[0]?._id === loggedInUser?._id ? users[1]?.username : "Sender";
}