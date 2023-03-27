export const getSender = (loggedInUser, users) => {
  if (users[0]?._id === loggedInUser?._id) {
    return users[1]?.username;
  } else if (users[1]?._id === loggedInUser?._id) {
    return users[0]?.username;
  }
};

export const getSenderImage = (loggedInUser, users) => {
  if (users[0]?._id === loggedInUser?._id) {
    return users[1]?.image;
  } else if (users[1]?._id === loggedInUser?._id) {
    return users[0]?.image;
  }
};

export const isSameSender = (messages, m, i, userId) => {
  // console.log((
  //   i < messages.length - 1 &&
  //   (messages[i + 1].sender?._id !== m.sender._id ||
  //     messages[i + 1].sender?._id === undefined) &&
  //   messages[i].sender?._id !== userId
  // ));
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender?._id !== m.sender._id ||
      messages[i + 1].sender?._id === undefined) &&
    messages[i].sender?._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  // console.log(userId)
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender?._id !== userId &&
    messages[messages.length - 1].sender?._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1]?.sender?._id === m?.sender?._id &&
    messages[i]?.sender._id !== userId
  )
    return 70;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1]?.sender?._id !== m?.sender?._id &&
      messages[i]?.sender?._id !== userId) ||
    (i === messages.length - 1 && messages[i]?.sender?._id !== userId)
  )
    return 30;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
