const Messages = require('../model/messageModel');

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    res.json(projectedMessages);
  } catch (err) {
    next(err);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;

    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      return res.json({
        success: true,
        data: {
          message: data,
        },
      });
    }
    return res.json({
      success: false,
      msg: 'failed to create message',
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
