export const getSender = (loggedInUser, users) => {
    // console.log(users[0]._id, loggedInUser?._id,users[0]._id === loggedInUser?._id)
    
    // console.log("logged IN er id: " ,loggedInUser._id);
    // console.log("user 0  er id : ", users[0]._id)
    // console.log("user 1 er id : ", users[1]._id)

    // return users[0]?._id === loggedInUser?._id ? users[1]?.username : "Sender";

    if(users[0]?._id === loggedInUser?._id){
        return users[1]?.username
    }
    else if(users[1]?._id === loggedInUser?._id){
        return users[0]?.username
    }
}


export const getSenderImage = (loggedInUser, users) => {
    if(users[0]?._id === loggedInUser?._id){
        return users[1]?.image
    }
    else if(users[1]?._id === loggedInUser?._id){
        return users[0]?.image
    }
}
